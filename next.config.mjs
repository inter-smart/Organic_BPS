/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
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
