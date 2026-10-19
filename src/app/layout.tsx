import type { Metadata } from "next";
import localFont from "next/font/local";
import { EnquiryProvider } from "@/components/Enquiry";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Gini } from "@/components/Gini";
import { SiteProvider } from "@/components/SiteContext";
import { getSite } from "@/lib/cms/site";
import { SITE_URL } from "@/lib/cms/seo";
import "./globals.css";

// Inter is bundled with the project (from @fontsource-variable/inter) rather than
// fetched from Google Fonts, so it loads even when that download is blocked.
const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

// Site name, tagline and favicon come from CMS Settings when set (lib/cms/site.ts).
export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    metadataBase: new URL(SITE_URL),
    title: `Best IT Training Institute in ${site.city} | AI, Software & IT Training — ${site.name}`,
    description:
      site.tagline ??
      `${site.name} ${site.city} — AI, full-stack development, data science, cyber security, digital marketing and CAD training with live projects, 1:1 mentoring and placement support.`,
    // favicon.ico is app/favicon.ico (a copy of the one in public/images/favicons).
    icons: site.favicon
      ? { icon: [{ url: site.favicon }], apple: { url: site.favicon } }
      : {
          icon: [
            { url: "/images/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            { url: "/images/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
          ],
          apple: { url: "/images/favicons/apple-touch-icon.png", sizes: "180x180" },
        },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const site = await getSite();
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased`}
    >
      <body className="font-sans">
        <SiteProvider value={site}>
          <EnquiryProvider>{children}</EnquiryProvider>
          <Gini />
        </SiteProvider>
        <ScrollToTop />
      </body>
    </html>
  );
}
