import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // The Internship & Training section moved from /internship-training.
  async redirects() {
    return [
      { source: "/internship-training", destination: "/internship-training-in-lucknow", permanent: true },
      { source: "/internship-training/:path*", destination: "/internship-training-in-lucknow/:path*", permanent: true },
      // 6 Weeks merged into 45 Days; 9 Months was dropped.
      { source: "/internship-training-in-lucknow/6-weeks/:path*", destination: "/internship-training-in-lucknow/45-days/:path*", permanent: true },
      { source: "/internship-training-in-lucknow/9-months/:path*", destination: "/internship-training-in-lucknow/6-months/:path*", permanent: true },
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
