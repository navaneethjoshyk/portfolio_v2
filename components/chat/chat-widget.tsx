"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import Markdown, { type MarkdownToJSX } from "markdown-to-jsx";
import { MessageCircle, SendHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

// Chat window for the homepage. Talks to the Netlify Function at /api/chat
// (netlify/functions/chat.mts), which calls the Claude API with a prompt built
// from this site's own content. Conversations aren't stored anywhere.

type Message = { role: "user" | "assistant"; content: string };

// Kept in step with the server's limits in chat.mts.
const MAX_QUESTIONS = 12;
const MAX_CHARS = 500;

const SUGGESTIONS = [
  "What's his experience?",
  "What tools does he work with?",
  "Which projects should I look at?",
  "Is he open to new roles?",
];

const GREETING = `Hi! I'm an AI assistant that answers questions about ${profile.name.split(" ")[0]}'s experience, skills, projects, and how to reach him. What would you like to know?`;

const ERROR_MESSAGES: Record<string, string> = {
  not_configured: `The assistant isn't available right now. You can email ${profile.email} instead.`,
  busy: "Lots of questions right now. Please try again in a minute.",
  rate_limited: "That's a lot of questions in a short time. Please wait a minute and try again.",
  timeout: "That took too long to answer. Please try again.",
  default: `Something went wrong. Please try again, or email ${profile.email}.`,
};

// Only these links are rendered as links in answers; anything else the
// model writes stays plain text, so a reply can never point visitors to an
// unexpected site.
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

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const panelId = useId();
  const titleId = useId();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const questionsAsked = messages.filter((m) => m.role === "user").length;
  const limitReached = questionsAsked >= MAX_QUESTIONS;

  // Focus the question box on open, and hand focus back to the launcher on
  // close (it only re-mounts after the panel unmounts, hence the effect).
  const wasOpen = useRef(false);
  useEffect(() => {
    if (open) inputRef.current?.focus();
    else if (wasOpen.current) launcherRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    endRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "end" });
  }, [messages, pending, error]);

  function close() {
    setOpen(false);
  }

  async function ask(question: string) {
    const text = question.trim();
    if (!text || pending || limitReached) return;

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
    ask(input);
  }

  function onInputKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    // Enter sends; Shift+Enter adds a new line.
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      ask(input);
    }
  }

  return (
    <>
      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          onKeyDown={(event) => event.key === "Escape" && close()}
          className="fixed z-40 right-4 bottom-4 md:right-8 md:bottom-8 flex flex-col w-[min(24rem,calc(100vw-2rem))] h-[min(34rem,calc(100dvh-6rem))] rounded-xl border bg-background text-foreground shadow-xl"
        >
          <div className="flex items-start justify-between gap-3 border-b px-4 py-3">
            <div>
              <h2 id={titleId} className="text-base font-semibold leading-tight">
                Ask about {profile.name.split(" ")[0]}
              </h2>
              <p className="text-xs text-muted-foreground">AI assistant · answers from this site</p>
            </div>
            <Button variant="ghost" size="icon" onClick={close} aria-label="Close chat">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm">
            <div role="log" aria-live="polite" aria-relevant="additions" className="space-y-3">
              <div className="max-w-[85%] rounded-lg bg-muted px-3 py-2">{GREETING}</div>

              {messages.map((message, index) =>
                message.role === "user" ? (
                  <div
                    key={index}
                    className="ml-auto max-w-[85%] w-fit rounded-lg bg-primary px-3 py-2 text-primary-foreground whitespace-pre-wrap break-words"
                  >
                    <span className="sr-only">You: </span>
                    {message.content}
                  </div>
                ) : (
                  <div key={index} className="max-w-[85%] rounded-lg bg-muted px-3 py-2 break-words">
                    <span className="sr-only">Assistant: </span>
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
                  That&apos;s the question limit for this chat. For anything else,{" "}
                  <a href={`mailto:${profile.email}`} className="font-medium underline underline-offset-2">
                    email {profile.name.split(" ")[0]}
                  </a>
                  .
                </div>
              )}
            </div>

            {messages.length === 0 && !pending && (
              <div className="flex flex-wrap gap-2 pt-1" aria-label="Suggested questions">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => ask(suggestion)}
                    className="rounded-full border px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

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
              AI-generated answers based on this site and can be wrong. For anything important,{" "}
              <a href={`mailto:${profile.email}`} className="underline underline-offset-2">
                email {profile.name.split(" ")[0]}
              </a>
              .
              {input.length > MAX_CHARS - 100 && (
                <span className="ml-1">({MAX_CHARS - input.length} characters left)</span>
              )}
            </p>
          </form>
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
          <span className="sr-only sm:not-sr-only">Ask about {profile.name.split(" ")[0]}</span>
        </button>
      )}
    </>
  );
}
