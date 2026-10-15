import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Served at /manifest.webmanifest; the icons are in public/images/favicons.
export default function manifest(): MetadataRoute.Manifest {
  const icons = "/images/favicons";
  return {
    name: `${site.name} ${site.city}`,
    short_name: site.name,
    description: `AI, software and IT training with live projects and internships at ${site.name} ${site.city}.`,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0b1f4b",
    theme_color: "#0b1a4d",
    icons: [
      { src: `${icons}/android-chrome-192x192.png`, sizes: "192x192", type: "image/png", purpose: "any" },
      { src: `${icons}/android-chrome-512x512.png`, sizes: "512x512", type: "image/png", purpose: "any" },
      { src: `${icons}/android-chrome-512x512.png`, sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
