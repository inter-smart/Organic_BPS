import RouteLoader from "@/components/common/route-loader";
import { Google_Sans, Inter, Roboto } from "next/font/google";
import { Suspense } from "react";
import "lenis/dist/lenis.css";
import "./globals.css";
import Preloader from "@/components/common/preloader";
import SmoothScroll from "@/components/common/smooth-scroll";
import SiteLayout from "@/components/layout/site-layout";
import { allowIndexing, siteUrl } from "@/data/seo";
import { INTRO_KEY } from "@/lib/intro-key";

const googleSans = Google_Sans({
  subsets: ["latin"],
  variable: "--font-google-sans",
  weight: "variable",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  // A meta tag overrides the weaker Referrer-Policy header set by the server.
  referrer: "strict-origin-when-cross-origin",
  robots: allowIndexing
    ? { index: true, follow: true }
    : {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false, noarchive: true },
      },
};

export const viewport = { themeColor: "#161616" };

// runs before first paint so a returning visitor never sees the intro flash
const skipIntro = `try{if(sessionStorage.getItem("${INTRO_KEY}")){var d=document.documentElement;d.dataset.intro="done";d.dataset.introSkip=""}}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${googleSans.variable} ${inter.variable} ${roboto.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: skipIntro }} />
        <noscript>
          <style>{".preloader{display:none!important}"}</style>
        </noscript>
      </head>
      <body>
        <Preloader />
        <SmoothScroll />
        <Suspense fallback={<RouteLoader />}>
          <SiteLayout>{children}</SiteLayout>
        </Suspense>
      </body>
    </html>
  );
}
