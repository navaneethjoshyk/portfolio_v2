// POST /api/chat: backend for the homepage chat's optional typed questions.
// The chat only shows a typing box (and so only calls this) when the site is
// built with CHAT_AI_ENABLED=true; preset questions never reach this code.
//
// Runs as a Netlify Function so the Claude API key stays on the server and
// never reaches the browser. Needs one environment variable set in Netlify
// (Site configuration → Environment variables):
//
//   ANTHROPIC_API_KEY   your key from platform.claude.com
//
// Optional overrides (defaults shown):
//   ANTHROPIC_MODEL     claude-haiku-5-5
//   ANTHROPIC_VERSION   2026-10-21
//
// Cost and abuse controls: Netlify rate-limits each visitor (see `config`
// at the bottom), conversations and messages are length-capped below, and
// replies are capped at MAX_REPLY_TOKENS. Also set a monthly spend limit in
// the Claude Console as a backstop.

import { buildSystemPrompt } from "../../lib/chat-knowledge";

const MODEL = process.env.ANTHROPIC_MODEL || "claude-haiku-5-5";
const API_VERSION = process.env.ANTHROPIC_VERSION || "2026-10-21";
const API_URL = "https://api.anthropic.com/v1/messages";

const MAX_REPLY_TOKENS = 500;
const MAX_USER_MESSAGE_CHARS = 500;
const MAX_ASSISTANT_MESSAGE_CHARS = 4000;
const MAX_MESSAGES = 24; // 12 visitor questions + 12 replies per conversation
const HISTORY_SENT = 10; // only the most recent turns go to the model
const MAX_BODY_BYTES = 40_000;
// Netlify stops synchronous functions after ~10s; give up first so the
// visitor gets a clean "try again" instead of a gateway error.
const UPSTREAM_TIMEOUT_MS = 9_000;

// Built once per function instance; data comes from files bundled at deploy.
const SYSTEM_PROMPT = buildSystemPrompt();

type ChatMessage = { role: "user" | "assistant"; content: string };

function json(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function parseMessages(value: unknown): ChatMessage[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > MAX_MESSAGES) {
    return null;
  }
  const messages: ChatMessage[] = [];
  for (const [index, item] of value.entries()) {
    if (typeof item !== "object" || item === null) return null;
    const { role, content } = item as Record<string, unknown>;
    const expectedRole = index % 2 === 0 ? "user" : "assistant";
    if (role !== expectedRole || typeof content !== "string") return null;
    const text = content.trim();
    const limit = role === "user" ? MAX_USER_MESSAGE_CHARS : MAX_ASSISTANT_MESSAGE_CHARS;
    if (!text || text.length > limit) return null;
    messages.push({ role: expectedRole, content: text });
  }
  // The visitor always has the last word when asking for a reply.
  return messages[messages.length - 1].role === "user" ? messages : null;
}

export default async (request: Request): Promise<Response> => {
  if (request.method !== "POST") {
    return json(405, { error: "method_not_allowed" });
  }

  // Only accept calls from this site's own pages, not other websites.
  const origin = request.headers.get("origin");
  if (origin) {
    let sameSite = false;
    try {
      sameSite = new URL(origin).host === new URL(request.url).host;
    } catch {
      // e.g. "Origin: null" from sandboxed pages
    }
    if (!sameSite) return json(403, { error: "forbidden" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("chat: ANTHROPIC_API_KEY is not set");
    return json(503, { error: "not_configured" });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json(413, { error: "too_large" });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { error: "bad_request" });
  }

  const messages = parseMessages((body as { messages?: unknown })?.messages);
  if (!messages) {
    return json(400, { error: "bad_request" });
  }

  // Trim history, keeping it starting on a visitor message as the API requires.
  let recent = messages.slice(-HISTORY_SENT);
  if (recent[0].role !== "user") recent = recent.slice(1);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const upstream = await fetch(API_URL, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": API_VERSION,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_REPLY_TOKENS,
        system: [
          {
            type: "text",
            text: SYSTEM_PROMPT,
            // The system prompt is identical for every visitor, so cache it:
            // repeat reads cost a tenth of normal input pricing.
            cache_control: { type: "ephemeral" },
          },
        ],
        messages: recent,
      }),
    });

    if (!upstream.ok) {
      // Log the reason for debugging in Netlify's function logs, but never
      // the visitor's messages.
      const detail = await upstream.text().catch(() => "");
      console.error(`chat: Claude API ${upstream.status} ${detail.slice(0, 300)}`);
      const busy = upstream.status === 429 || upstream.status === 529;
      return json(busy ? 503 : 502, { error: busy ? "busy" : "upstream" });
    }

    const data = (await upstream.json()) as {
      content?: { type: string; text?: string }[];
      stop_reason?: string;
    };
    const reply = (data.content ?? [])
      .filter((block) => block.type === "text" && block.text)
      .map((block) => block.text)
      .join("")
      .trim();

    if (!reply) {
      console.error(`chat: empty reply (stop_reason=${data.stop_reason})`);
      return json(502, { error: "upstream" });
    }

    return json(200, { reply });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "AbortError";
    console.error(`chat: ${timedOut ? "timed out" : "request failed"}`, timedOut ? "" : error);
    return json(timedOut ? 504 : 502, { error: timedOut ? "timeout" : "upstream" });
  } finally {
    clearTimeout(timeout);
  }
};

export const config = {
  path: "/api/chat",
  // Per-visitor limit enforced by Netlify before this function runs
  // (blocked requests get a 429 and cost nothing). Available on all plans.
  rateLimit: {
    windowLimit: 8,
    windowSize: 60,
    aggregateBy: ["ip", "domain"],
  },
};
