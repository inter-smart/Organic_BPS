/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async headers() {
    const rules = [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
      {
        source: "/:dir(images|videos)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
    if (process.env.NEXT_PUBLIC_APP_ENV !== "production") {
      rules.push({
        source: "/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      });
    }
    return rules;
  },
  images: {
    qualities: [100],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "organic-bps.dev2.intersmarthosting.in",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
