"use client";

// Site settings from the CMS (lib/cms/site.ts) for Client Components. The root
// layout loads them once and provides them here; Server Components call
// getSite() instead.
import { createContext, useContext, type ReactNode } from "react";
import type { SiteInfo } from "@/lib/cms/site";
import { site as builtIn, stats as builtInStats } from "@/lib/site";

const fallback: SiteInfo = {
  ...builtIn,
  social: [],
  stats: builtInStats.map((s) => ({ value: s.value, suffix: s.suffix, label: s.label, icon: s.icon })),
};

const SiteContext = createContext<SiteInfo>(fallback);

export function SiteProvider({ value, children }: { value: SiteInfo; children: ReactNode }) {
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export const useSite = () => useContext(SiteContext);
