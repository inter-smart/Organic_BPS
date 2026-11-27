import { Google_Sans, Inter, Roboto } from "next/font/google";
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
  // used by one inner page, so it should not compete with the heading font
  preload: false,
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

// Pages go out as complete HTML, with no loading boundary above them. This keeps
// the build passing when caching is switched off and a page has to wait for the API.
export const instant = false;

// Runs before first paint: a returning visitor never sees the intro flash, and on
// phones the intro is left to CSS so it does not wait for the scripts.
const introFlags = `(function(){var d=document.documentElement,seen;try{seen=sessionStorage.getItem("${INTRO_KEY}")}catch(e){}if(seen){d.dataset.intro="done";d.dataset.introSkip=""}else if(matchMedia("(max-width: 959.98px)").matches){d.dataset.intro="done";d.dataset.introLite=""}})()`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${googleSans.variable} ${inter.variable} ${roboto.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introFlags }} />
        <noscript>
          <style>{".preloader{display:none!important}"}</style>
        </noscript>
      </head>
      <body>
        <Preloader />
        <SmoothScroll />
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
