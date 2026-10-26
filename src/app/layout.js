import { Google_Sans, Inter } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import Preloader from "@/components/common/preloader";
import SmoothScroll from "@/components/common/smooth-scroll";

const googleSans = Google_Sans({
  subsets: ["latin"],
  variable: "--font-google-sans",
  weight: "variable",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Organic BPS — Purpose is the journey that powers every other journey",
  description:
    "Organic BPS is a Brand Purpose Consultancy with more than 26 years of experience in brand strategy and communication.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noarchive: true } },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${googleSans.variable} ${inter.variable}`}>
      <body>
        <noscript>
          <style>{".preloader{display:none!important}"}</style>
        </noscript>
        <Preloader />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
