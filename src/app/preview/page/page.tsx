// A page draft from the CMS editor, rendered as /[slug] would. The CMS sends
// the title, body and blocks; the template is previewed as "default".
import { Suspense } from "react";
import { PageView } from "@/components/cms/PageView";
import type { CmsPage } from "@/lib/cms/types";
import { readDraft } from "@/lib/preview/store";

async function Draft({ searchParams }: { searchParams: PageProps<"/preview/page">["searchParams"] }) {
  const token = (await searchParams).d;
  const draft = readDraft<Partial<CmsPage>>("page", typeof token === "string" ? token : undefined);
  if (!draft) return <Waiting />;
  return (
    <PageView
      page={{
        title: draft.title || "Untitled page",
        slug: draft.slug || "preview",
        template: draft.template || "default",
        content: draft.content ?? "",
        sections: draft.sections ?? [],
        seo: draft.seo,
      }}
    />
  );
}

function Waiting() {
  return <p className="grid min-h-svh place-items-center bg-hero-950 text-slate-300">Waiting for the editor…</p>;
}

export default function PagePreview({ searchParams }: PageProps<"/preview/page">) {
  return (
    <Suspense fallback={<Waiting />}>
      <Draft searchParams={searchParams} />
    </Suspense>
  );
}
