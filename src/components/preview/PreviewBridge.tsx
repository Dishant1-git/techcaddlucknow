"use client";

// The frame's side of the CMS live preview. Says when it is listening, takes
// each draft the CMS posts, stores it (/api/preview) and re-renders the page
// for it by token, and scrolls to the section the editor is working on.
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  CMS_ADMIN_ORIGIN,
  PREVIEW_DRAFT,
  PREVIEW_READY,
  PREVIEW_SCROLL,
  type PreviewKind,
} from "./preview-protocol";

/** Section ids the CMS sends, where this site's element has another id. */
const ALIASES: Record<string, string> = { hero: "top", "who-can-do": "who-can-join", cta: "contact", enquiry: "contact" };

function scrollToSection(section: string) {
  const el =
    document.getElementById(section) ??
    document.getElementById(ALIASES[section] ?? "") ??
    // Course sections are wrapped in a box-less element; scroll to its first child.
    document.querySelector(`[data-course-section="${CSS.escape(section)}"] > *`);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function PreviewBridge() {
  const router = useRouter();
  const pathname = usePathname();
  const kind = pathname.split("/")[2] as PreviewKind;
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const latest = useRef(0);

  useEffect(() => {
    if (window.parent === window) return;

    async function render(draft: unknown) {
      const seq = ++latest.current;
      const res = await fetch("/api/preview", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind, draft }),
      });
      if (!res.ok || seq !== latest.current) return;
      const { token } = (await res.json()) as { token: string };
      router.replace(`/preview/${kind}?d=${token}`, { scroll: false });
    }

    function onMessage(event: MessageEvent) {
      if (event.origin !== CMS_ADMIN_ORIGIN) return;
      const data = event.data as { type?: string; kind?: string; payload?: unknown; section?: string } | undefined;
      if (!data || data.kind !== kind) return;
      if (data.type === PREVIEW_DRAFT) {
        // Typing posts a draft per keystroke; render the last one in a burst.
        clearTimeout(timer.current);
        timer.current = setTimeout(() => void render(data.payload), 250);
      }
      if (data.type === PREVIEW_SCROLL && data.section) scrollToSection(data.section);
    }

    window.addEventListener("message", onMessage);
    window.parent.postMessage({ type: PREVIEW_READY, kind }, CMS_ADMIN_ORIGIN);
    return () => {
      window.removeEventListener("message", onMessage);
      clearTimeout(timer.current);
    };
  }, [kind, router]);

  return null;
}
