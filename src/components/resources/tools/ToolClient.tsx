"use client";

// Client-side pieces shared by the free tools: copy buttons and the call to
// the AI routes under /api/tools/*.
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AlertCircle, Check, Copy } from "lucide-react";

/** Copies text and remembers which button did it for 2.5 seconds. */
export function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);
  const copy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setCopied(key);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(null), 2500);
  };
  return { copied, copy };
}

export function CopyButton({
  text,
  label = "Copy",
  copiedLabel = "Copied!",
  className = "",
}: {
  text: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
}) {
  const { copied, copy } = useCopy();
  const done = copied === "x";
  return (
    <button
      type="button"
      onClick={() => copy("x", text)}
      className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[13px] font-semibold transition ${
        done
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-slate-200 bg-white text-navy hover:border-brand hover:text-brand"
      } ${className}`}
    >
      {done ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      <span aria-live="polite">{done ? copiedLabel : label}</span>
    </button>
  );
}

export type AiResult = { ok: true; text: string } | { ok: false; error: string };

/** POSTs to one of the AI routes; maps the route's `{ok:false,error}` replies to a message. */
export async function callAiTool(url: string, body: unknown): Promise<AiResult> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = (await res.json().catch(() => null)) as
      | { ok: true; text: string }
      | { ok: false; error?: string }
      | null;
    if (res.status === 503) {
      return {
        ok: false,
        error: "Our AI tools are not configured yet. Please try again later.",
      };
    }
    if (!json || !json.ok) {
      return { ok: false, error: json?.error || "Something went wrong. Please try again." };
    }
    return { ok: true, text: String(json.text ?? "") };
  } catch {
    return { ok: false, error: "We could not reach the server. Check your connection and try again." };
  }
}

export function ErrorNote({ children }: { children: ReactNode }) {
  return (
    <p
      role="alert"
      className="flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
    >
      <AlertCircle className="mt-0.5 size-4 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

/** Three bouncing dots for a pending AI call. */
export function Dots() {
  return (
    <span aria-hidden className="inline-flex gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-1.5 animate-bounce rounded-full bg-current"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  );
}
