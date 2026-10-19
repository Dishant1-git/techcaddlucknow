// Site-wide details an editor sets in CMS Settings, laid over the built-in
// `site` values: anything left blank keeps the site's own value.
import "server-only";
import { site as builtIn, stats as builtInStats } from "../site";
import { cmsAsset, cmsGet } from "./client";
import type { CmsSite } from "./types";

export type SocialLink = { network: string; label: string; href: string };

export type SiteInfo = Omit<typeof builtIn, "copyrightYear"> & {
  copyrightYear: number;
  tagline?: string;
  social: SocialLink[];
  /** Headline figures; the built-in ones when the editor has listed none. */
  stats: { value: number; suffix: string; label: string; icon?: string }[];
  logo?: { src: string; alt: string };
  favicon?: string;
  robotsTxt?: string;
};

const NETWORKS: [key: string, label: string][] = [
  ["instagram", "Instagram"],
  ["linkedin", "LinkedIn"],
  ["facebook", "Facebook"],
  ["youtube", "YouTube"],
  ["x", "X"],
  ["github", "GitHub"],
  ["website", "Website"],
];

const digits = (phone: string) => phone.replace(/\D/g, "").slice(-10);

/** "15k+" → { value: 15, suffix: "k+" }, so the stats strip can count up to it. */
function parseStat(value: string) {
  const m = value.trim().match(/^([\d,]+(?:\.\d+)?)(.*)$/);
  return m ? { value: Number(m[1].replace(/,/g, "")), suffix: m[2].trim() } : { value: 0, suffix: value };
}

export async function getSite(): Promise<SiteInfo> {
  const cms = await cmsGet<CmsSite>("/site");
  const phone = cms?.contactPhone?.trim() || builtIn.phone;
  const address = cms?.address?.trim() || builtIn.address;
  const ownAddress = !!cms?.address?.trim();
  return {
    ...builtIn,
    name: cms?.siteName?.trim() || builtIn.name,
    tagline: cms?.tagline?.trim() || undefined,
    email: cms?.contactEmail?.trim() || builtIn.email,
    phone,
    phoneHref: cms?.contactPhone?.trim() ? `tel:+91${digits(phone)}` : builtIn.phoneHref,
    whatsappHref: cms?.contactPhone?.trim() ? `https://wa.me/91${digits(phone)}` : builtIn.whatsappHref,
    address,
    // The contact bar is narrow: an editor's address is cut to its first two parts.
    shortAddress: ownAddress ? address.split(",").slice(0, 2).join(",").trim() : builtIn.shortAddress,
    mapsHref: ownAddress
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${builtIn.name} ${address}`)}`
      : builtIn.mapsHref,
    social: NETWORKS.flatMap(([key, label]) => {
      const href = cms?.social?.[key]?.trim();
      return href ? [{ network: key, label, href }] : [];
    }),
    stats: cms?.stats?.length
      ? cms.stats.map((s) => ({ ...parseStat(s.value), label: s.label }))
      : builtInStats.map((s) => ({ value: s.value, suffix: s.suffix, label: s.label, icon: s.icon })),
    logo: cms?.logo?.url ? { src: cmsAsset(cms.logo.url)!, alt: cms.logo.alt || builtIn.name } : undefined,
    favicon: cmsAsset(cms?.favicon?.url),
    robotsTxt: cms?.robotsTxt,
  };
}
