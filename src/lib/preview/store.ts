// Unsaved CMS drafts, held briefly so the preview frame can render one by
// token. In memory on purpose: a draft is the editor's scratch work, never
// written anywhere, and gone a few minutes after they stop typing.
import "server-only";
import { randomUUID } from "node:crypto";

type Entry = { kind: string; draft: unknown; at: number };

const TTL_MS = 30 * 60_000;
const MAX_ENTRIES = 500;

// One map across hot reloads in development.
const g = globalThis as typeof globalThis & { previewDrafts?: Map<string, Entry> };
const drafts = (g.previewDrafts ??= new Map());

function prune() {
  const now = Date.now();
  for (const [token, e] of drafts) if (now - e.at > TTL_MS) drafts.delete(token);
  // Oldest first: a Map iterates in insertion order.
  while (drafts.size > MAX_ENTRIES) drafts.delete(drafts.keys().next().value!);
}

export function saveDraft(kind: string, draft: unknown) {
  prune();
  const token = randomUUID();
  drafts.set(token, { kind, draft, at: Date.now() });
  return token;
}

export function readDraft<T>(kind: string, token: string | undefined): T | undefined {
  if (!token) return undefined;
  const e = drafts.get(token);
  return e && e.kind === kind && Date.now() - e.at <= TTL_MS ? (e.draft as T) : undefined;
}
