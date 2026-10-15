import type { Metadata } from "next";
import localFont from "next/font/local";
import { EnquiryProvider } from "@/components/Enquiry";
import { ScrollToTop } from "@/components/ScrollToTop";
import { site } from "@/lib/site";
import "./globals.css";

// Inter is bundled with the project (from @fontsource-variable/inter) rather than
// fetched from Google Fonts, so it loads even when that download is blocked.
const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: `Best IT Training Institute in ${site.city} | AI, Software & IT Training — ${site.name}`,
  description: `${site.name} ${site.city} — AI, full-stack development, data science, cyber security, digital marketing and CAD training with live projects, 1:1 mentoring and placement support.`,
  // favicon.ico is app/favicon.ico (a copy of the one in public/images/favicons).
  icons: {
    icon: [
      { url: "/images/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: { url: "/images/favicons/apple-touch-icon.png", sizes: "180x180" },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased`}
    >
      <body className="font-sans">
        <EnquiryProvider>{children}</EnquiryProvider>
        <ScrollToTop />
      </body>
    </html>
  );
}
