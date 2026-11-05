import { Google_Sans, Inter, Roboto } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import Preloader from "@/components/common/preloader";
import SmoothScroll from "@/components/common/smooth-scroll";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { layout_data } from "@/lib/layout-data";

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
  title: "Organic BPS — Purpose is the journey that powers every other journey",
  description:
    "Organic BPS is a Brand Purpose Consultancy with more than 26 years of experience in brand strategy and communication.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noarchive: true },
  },
};

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
        <Header data={layout_data.header} />
        {children}
        <Footer data={layout_data.footer} />
      </body>
    </html>
  );
}
