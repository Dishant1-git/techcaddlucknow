import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // The MySQL driver runs as a plain Node.js package, not bundled.
  serverExternalPackages: ["mysql2"],
  // The CMS live preview may be framed by the CMS admin only, and never indexed.
  async headers() {
    const admin = (process.env.NEXT_PUBLIC_CMS_ADMIN_ORIGIN ?? "http://localhost:5173").replace(/\/$/, "");
    return [
      {
        source: "/preview/:path*",
        headers: [
          { key: "Content-Security-Policy", value: `frame-ancestors 'self' ${admin}` },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
  // The Internship & Training section moved from /internship-training.
  async redirects() {
    return [
      { source: "/internship-training", destination: "/internship-training-in-lucknow", permanent: true },
      { source: "/internship-training/:path*", destination: "/internship-training-in-lucknow/:path*", permanent: true },
      // 6 Weeks merged into 45 Days; 9 Months was dropped.
      { source: "/internship-training-in-lucknow/6-weeks/:path*", destination: "/internship-training-in-lucknow/45-days/:path*", permanent: true },
      { source: "/internship-training-in-lucknow/9-months/:path*", destination: "/internship-training-in-lucknow/6-months/:path*", permanent: true },
      // The address shapes the CMS (and other techcadd sites) use, onto this site's own.
      { source: "/blog", destination: "/tech-blog-of-lucknow", permanent: true },
      { source: "/blogs", destination: "/tech-blog-of-lucknow", permanent: true },
      { source: "/blog/:slug", destination: "/tech-blog-of-lucknow/:slug", permanent: true },
      { source: "/blogs/:slug", destination: "/tech-blog-of-lucknow/:slug", permanent: true },
      { source: "/events", destination: "/techcadd-lucknow-seminars", permanent: true },
      { source: "/events/:slug", destination: "/techcadd-lucknow-seminars/:slug", permanent: true },
      { source: "/gallery", destination: "/techcadd-lucknow-classroom-gallery-images", permanent: true },
      { source: "/gallery/:slug", destination: "/techcadd-lucknow-classroom-gallery-images#:slug", permanent: true },
      { source: "/faq", destination: "/frequently-asked-questions-techcadd-lucknow", permanent: true },
      { source: "/reviews", destination: "/techcadd-lucknow-student-reviews", permanent: true },
      // Domains renamed after the courses they teach.
      ...[
        ["ai-machine-learning", "artificial-intelligence"],
        ["data-science-analytics", "data-analytics"],
        ["full-stack-web-development", "mern-full-stack"],
        ["cloud-devops", "cloud-computing"],
      ].map(([from, to]) => ({
        source: `/internship-training-in-lucknow/:duration/${from}`,
        destination: `/internship-training-in-lucknow/:duration/${to}`,
        permanent: true,
      })),
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
