import RouteLoader from "@/components/common/route-loader";
import { Google_Sans, Inter, Roboto } from "next/font/google";
import { Suspense } from "react";
import "lenis/dist/lenis.css";
import "./globals.css";
import Preloader from "@/components/common/preloader";
import SmoothScroll from "@/components/common/smooth-scroll";
import SiteLayout from "@/components/layout/site-layout";
import { allowIndexing, siteUrl } from "@/data/seo";

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
  preload: false,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(siteUrl),
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${googleSans.variable} ${inter.variable} ${roboto.variable}`}>
      <head>
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
