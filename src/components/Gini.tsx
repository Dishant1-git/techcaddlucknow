"use client";

// Gini, the chat assistant: a floating button above the WhatsApp button that
// opens a small chat panel. Answers come from /api/gini (lib/gini.ts), which
// draws on CMS → AI Knowledge.
import { useEffect, useRef, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { Send, Sparkles, X } from "lucide-react";
import { useSite } from "./SiteContext";

type Message = { role: "user" | "assistant"; content: string };

const suggestions = ["Which course suits a beginner?", "Do you offer internships?", "Where is the centre?"];

export function Gini() {
  const site = useSite();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const list = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    list.current?.scrollTo({ top: list.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  // Not inside the CMS's live preview frame.
  if (pathname.startsWith("/preview")) return null;

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    const next: Message[] = [...messages, { role: "user", content: question }];
    setMessages(next);
    setDraft("");
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/gini", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = (await res.json()) as { ok: boolean; text?: string; error?: string };
      if (data.ok && data.text) setMessages([...next, { role: "assistant", content: data.text }]);
      else setError(data.error ?? "Something went wrong.");
    } catch {
      setError("Couldn't reach Gini. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(draft);
  };

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="gini-panel"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-24 right-5 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-cyan py-3 pl-4 pr-5 font-bold text-white shadow-xl shadow-brand/30 transition hover:scale-105"
      >
        {open ? <X className="size-5" /> : <Sparkles className="size-5" />}
        <span className="text-sm">{open ? "Close" : "Ask Gini"}</span>
      </button>

      {open && (
        <section
          id="gini-panel"
          role="dialog"
          aria-label="Chat with Gini"
          data-lenis-prevent
          className="fixed bottom-40 right-5 z-40 flex h-[min(32rem,calc(100dvh-12rem))] w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-hero-950/25"
        >
          <header className="bg-hero-950 px-5 py-4 text-white">
            <p className="flex items-center gap-2 font-display font-bold">
              <Sparkles className="size-4 text-cyan" /> Gini
            </p>
            <p className="text-xs text-slate-300">
              {site.name} {site.city}&apos;s assistant · answers can be wrong, so confirm fees and dates with a counsellor.
            </p>
          </header>

          <div ref={list} className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                  Hi! I&apos;m Gini. Ask me about courses, admissions, internships or how to reach us.
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => void send(s)}
                      className="rounded-full border border-brand/20 px-3 py-1.5 text-xs font-semibold text-brand hover:bg-brand/5"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <p
                key={i}
                className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.role === "user" ? "ml-auto rounded-br-md bg-brand text-white" : "rounded-bl-md bg-slate-100 text-slate-800"
                }`}
              >
                {m.content}
              </p>
            ))}
            {busy && <p className="w-fit animate-pulse rounded-2xl bg-slate-100 px-3.5 py-2.5 text-sm text-slate-500">Gini is typing…</p>}
            {error && <p className="rounded-2xl bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">{error}</p>}
          </div>

          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-slate-100 p-3">
            <input
              ref={input}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={1500}
              placeholder="Type your question…"
              aria-label="Your question"
              className="min-w-0 flex-1 rounded-full border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-brand"
            />
            <button
              type="submit"
              disabled={busy || !draft.trim()}
              aria-label="Send"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-white disabled:opacity-40"
            >
              <Send className="size-4" />
            </button>
          </form>
        </section>
      )}
    </>
  );
}
