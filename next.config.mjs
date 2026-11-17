/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async headers() {
    if (process.env.NEXT_PUBLIC_APP_ENV === "production") return [];
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
    ];
  },
  images: {
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
