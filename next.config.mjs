const isDev = process.env.NODE_ENV === "development";
const cms = process.env.NEXT_PUBLIC_API_URL
  ? new URL(process.env.NEXT_PUBLIC_API_URL).origin
  : "";
const recaptcha = "https://www.google.com/recaptcha/";

// Inline scripts stay allowed: nonces need per-request rendering, which
// cacheComponents rules out. React needs eval in development only.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${recaptcha} https://www.gstatic.com/recaptcha/`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${cms}`,
  `media-src 'self' ${cms}`,
  "font-src 'self'",
  `connect-src 'self' ${cms} ${recaptcha}`,
  `frame-src ${recaptcha} https://recaptcha.google.com/recaptcha/`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  poweredByHeader: false,
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
          { key: "Content-Security-Policy", value: csp },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
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
