// The CMS live preview (/preview/course, /preview/page). Framed by the CMS
// admin only (see next.config.ts headers), never indexed, and marked as a
// preview so a draft can't be mistaken for the published page.
import type { Metadata } from "next";
import { PreviewBridge } from "@/components/preview/PreviewBridge";

export const metadata: Metadata = { title: "Preview", robots: { index: false, follow: false } };

export default function PreviewLayout({ children }: LayoutProps<"/preview">) {
  return (
    <>
      <PreviewBridge />
      <p className="fixed bottom-4 left-4 z-[30000] rounded-full bg-sun px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-hero-950 shadow-lg">
        Preview · unsaved draft
      </p>
      {children}
    </>
  );
}
