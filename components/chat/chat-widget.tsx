"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import Markdown, { type MarkdownToJSX } from "markdown-to-jsx";
import { MessageCircle, SendHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import type { FaqItem } from "@/lib/chat-faq";
import { cn } from "@/lib/utils";

// Chat window for the homepage.
//
// - Preset questions (lib/chat-faq.ts) are answered instantly in the browser:
//   no API, no cost, nothing to set up.
// - With `aiEnabled` (CHAT_AI_ENABLED=true at build time), visitors can also
//   type their own questions, which go to the Claude API through the Netlify
//   Function at /api/chat (netlify/functions/chat.mts).
//
// Conversations aren't stored anywhere.

type Message = { role: "user" | "assistant"; content: string };

// Kept in step with the server's limits in chat.mts.
const MAX_QUESTIONS = 12;
const MAX_CHARS = 500;

const FIRST_NAME = profile.name.split(" ")[0];

const ERROR_MESSAGES: Record<string, string> = {
  not_configured: `Typed questions aren't available right now. Pick a question above, or email ${profile.email}.`,
  busy: "Lots of questions right now. Please try again in a minute.",
  rate_limited: "That's a lot of questions in a short time. Please wait a minute and try again.",
  timeout: "That took too long to answer. Please try again.",
  default: `Something went wrong. Please try again, or email ${profile.email}.`,
};

// Only these links are rendered as links in answers; anything else stays
// plain text, so an answer can never point visitors to an unexpected site.
const SAFE_EXTERNAL_HOSTS = [
  "www.linkedin.com",
  "linkedin.com",
  "github.com",
  "www.figma.com",
  "figma.com",
];

function SafeLink({ href = "", children }: { href?: string; children?: React.ReactNode }) {
  const isInternal = href.startsWith("/") && !href.startsWith("//");
  const isMail = href === `mailto:${profile.email}`;
  let isExternal = false;
  try {
    const url = new URL(href);
    isExternal = url.protocol === "https:" && SAFE_EXTERNAL_HOSTS.includes(url.hostname);
  } catch {
    // relative or malformed: handled by the checks above
  }

  if (!isInternal && !isMail && !isExternal) return <>{children}</>;
  return (
    <a
      href={href}
      className="font-medium underline underline-offset-2"
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

const MARKDOWN_OPTIONS: MarkdownToJSX.Options = {
  disableParsingRawHTML: true,
  forceBlock: true,
  overrides: {
    a: { component: SafeLink },
    img: { component: () => null },
    p: { props: { className: "mb-2 last:mb-0" } },
    ul: { props: { className: "list-disc pl-5 mb-2 last:mb-0 space-y-1" } },
    ol: { props: { className: "list-decimal pl-5 mb-2 last:mb-0 space-y-1" } },
    h1: { component: "p", props: { className: "font-semibold mb-1" } },
    h2: { component: "p", props: { className: "font-semibold mb-1" } },
    h3: { component: "p", props: { className: "font-semibold mb-1" } },
  },
};

interface ChatWidgetProps {
  /** Preset questions and answers, built at build time from site data. */
  faq: FaqItem[];
  /** Also let visitors type questions, answered by the Claude API. */
  aiEnabled?: boolean;
}

export function ChatWidget({ faq, aiEnabled = false }: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [askedIds, setAskedIds] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const panelId = useId();
  const titleId = useId();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const lastQuestionRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const refocusChips = useRef(false);

  const remaining = faq.filter((item) => !askedIds.includes(item.id));
  const questionsAsked = messages.filter((m) => m.role === "user").length;
  const limitReached = aiEnabled && questionsAsked >= MAX_QUESTIONS;
  const lastQuestionIndex = messages.map((m) => m.role).lastIndexOf("user");

  // On open, focus the first thing to do (the question box, or the first
  // preset question). On close, hand focus back to the launcher; it only
  // re-mounts after the panel unmounts, hence the effect.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (open) {
      const target = aiEnabled ? inputRef.current : chipsRef.current?.querySelector("button");
      target?.focus();
    } else if (wasOpen.current) {
      launcherRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open, aiEnabled]);

  // Show each new question at the top of the view so its answer reads from
  // the start; while waiting or on error, show the bottom instead.
  useEffect(() => {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    if (pending || error) endRef.current?.scrollIntoView({ behavior, block: "end" });
    else lastQuestionRef.current?.scrollIntoView({ behavior, block: "start" });
  }, [messages, pending, error]);

  // A preset question's button disappears once it's answered, so move
  // keyboard focus to the next one instead of losing it.
  useEffect(() => {
    if (!refocusChips.current) return;
    refocusChips.current = false;
    const next =
      chipsRef.current?.querySelector("button") ?? (aiEnabled ? inputRef.current : closeRef.current);
    next?.focus({ preventScroll: true });
  }, [askedIds, aiEnabled]);

  function askPreset(item: FaqItem) {
    if (pending) return;
    setError(null);
    setMessages((prev) => [
      ...prev,
      { role: "user", content: item.question },
      { role: "assistant", content: item.answer },
    ]);
    setAskedIds((prev) => [...prev, item.id]);
    refocusChips.current = true;
  }

  async function askAi(question: string) {
    const text = question.trim();
    if (!aiEnabled || !text || pending || limitReached) return;

    const next: Message[] = [...messages, { role: "user", content: text.slice(0, MAX_CHARS) }];
    setMessages(next);
    setInput("");
    setError(null);
    setPending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && typeof data.reply === "string") {
        setMessages([...next, { role: "assistant", content: data.reply }]);
      } else {
        // Drop the unanswered question so the conversation stays valid
        // (it must alternate visitor/assistant), and put it back in the box.
        setMessages(messages);
        setInput(text);
        const code = res.status === 429 ? "rate_limited" : data.error;
        setError(ERROR_MESSAGES[code] ?? ERROR_MESSAGES.default);
        if (process.env.NODE_ENV === "development" && res.status === 404) {
          setError("The chat API only runs on Netlify. Use `netlify dev` instead of `npm run dev` to test it locally.");
        }
      }
    } catch {
      setMessages(messages);
      setInput(text);
      setError(ERROR_MESSAGES.default);
    } finally {
      setPending(false);
      inputRef.current?.focus();
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    askAi(input);
  }

  function onInputKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    // Enter sends; Shift+Enter adds a new line.
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      askAi(input);
    }
  }

  const emailLink = (
    <a href={`mailto:${profile.email}`} className="font-medium underline underline-offset-2">
      email {FIRST_NAME}
    </a>
  );

  return (
    <>
      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          onKeyDown={(event) => event.key === "Escape" && setOpen(false)}
          className="fixed z-40 right-4 bottom-4 md:right-8 md:bottom-8 flex flex-col w-[min(24rem,calc(100vw-2rem))] h-[min(34rem,calc(100dvh-6rem))] rounded-xl border bg-background text-foreground shadow-xl"
        >
          <div className="flex items-start justify-between gap-3 border-b px-4 py-3">
            <div>
              <h2 id={titleId} className="text-base font-semibold leading-tight">
                Ask about {FIRST_NAME}
              </h2>
              <p className="text-xs text-muted-foreground">
                {aiEnabled ? "AI assistant · answers from this site" : "Quick answers from this site"}
              </p>
            </div>
            <Button ref={closeRef} variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close chat">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm">
            <div role="log" aria-live="polite" aria-relevant="additions" className="space-y-3">
              <div className="max-w-[85%] rounded-lg bg-muted px-3 py-2">
                {aiEnabled
                  ? `Hi! I'm an AI assistant that answers questions about ${FIRST_NAME}'s experience, skills, projects, and how to reach him. Pick a question below or type your own.`
                  : `Hi! Pick a question below to learn about ${FIRST_NAME}'s experience, skills, projects, and how to reach him.`}
              </div>

              {messages.map((message, index) =>
                message.role === "user" ? (
                  <div
                    key={index}
                    ref={index === lastQuestionIndex ? lastQuestionRef : undefined}
                    className="ml-auto max-w-[85%] w-fit rounded-lg bg-primary px-3 py-2 text-primary-foreground whitespace-pre-wrap break-words scroll-mt-3"
                  >
                    <span className="sr-only">You: </span>
                    {message.content}
                  </div>
                ) : (
                  <div key={index} className="max-w-[85%] rounded-lg bg-muted px-3 py-2 break-words">
                    <span className="sr-only">Answer: </span>
                    <Markdown options={MARKDOWN_OPTIONS}>{message.content}</Markdown>
                  </div>
                )
              )}

              {pending && (
                <div className="w-fit rounded-lg bg-muted px-3 py-2 text-muted-foreground motion-safe:animate-pulse">
                  Thinking…
                </div>
              )}

              {error && (
                <div role="alert" className="rounded-lg border border-destructive/50 px-3 py-2 text-destructive">
                  {error}
                </div>
              )}

              {limitReached && (
                <div className="rounded-lg border px-3 py-2 text-muted-foreground">
                  That&apos;s the question limit for this chat. For anything else, {emailLink}.
                </div>
              )}

              {!aiEnabled && remaining.length === 0 && (
                <div className="rounded-lg border px-3 py-2 text-muted-foreground">
                  That&apos;s everything I can answer here. For anything else, {emailLink}.
                </div>
              )}
            </div>

            {remaining.length > 0 && !limitReached && (
              <div
                ref={chipsRef}
                role="group"
                aria-label={messages.length ? "More questions" : "Suggested questions"}
                className="pt-1"
              >
                {messages.length > 0 && (
                  <p aria-hidden="true" className="mb-2 text-xs text-muted-foreground">
                    More questions
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {remaining.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => askPreset(item)}
                      disabled={pending}
                      className="rounded-full border px-3 py-1.5 text-xs font-medium text-left hover:bg-muted transition-colors disabled:opacity-50"
                    >
                      {item.question}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {aiEnabled ? (
            <form onSubmit={onSubmit} className="border-t p-3 space-y-2">
              <div className="flex items-end gap-2">
                <label htmlFor={`${panelId}-input`} className="sr-only">
                  Your question
                </label>
                <textarea
                  id={`${panelId}-input`}
                  ref={inputRef}
                  rows={1}
                  value={input}
                  maxLength={MAX_CHARS}
                  disabled={limitReached}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={onInputKeyDown}
                  placeholder={limitReached ? "Question limit reached" : "Ask a question…"}
                  className="flex-1 resize-none rounded-md border bg-background px-3 py-2 text-sm max-h-28 placeholder:text-muted-foreground disabled:opacity-50"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={pending || limitReached || !input.trim()}
                  aria-label="Send question"
                >
                  <SendHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-[11px] leading-snug text-muted-foreground">
                Typed questions get AI-generated answers based on this site, which can be wrong. For anything
                important, {emailLink}.
                {input.length > MAX_CHARS - 100 && (
                  <span className="ml-1">({MAX_CHARS - input.length} characters left)</span>
                )}
              </p>
            </form>
          ) : (
            <p className="border-t px-4 py-3 text-xs leading-snug text-muted-foreground">
              Answers come from this site. For anything else, {emailLink}.
            </p>
          )}
        </div>
      )}

      {!open && (
        <button
          ref={launcherRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          className={cn(
            // Above the centered social-links pill on small screens, beside
            // it on larger ones.
            "fixed z-40 right-4 bottom-24 md:right-8 md:bottom-8",
            "flex items-center gap-2 rounded-full bg-primary text-primary-foreground shadow-lg",
            "h-12 px-4 text-sm font-medium hover:opacity-90 transition-opacity"
          )}
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          {/* Visible label on wider screens; screen-reader-only on phones. */}
          <span className="sr-only sm:not-sr-only">Ask about {FIRST_NAME}</span>
        </button>
      )}
    </>
  );
}
