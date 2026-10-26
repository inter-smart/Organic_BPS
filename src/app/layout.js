import { Google_Sans, Inter } from "next/font/google";
import "./globals.css";

const googleSans = Google_Sans({
  subsets: ["latin"],
  variable: "--font-google-sans",
  weight: "variable",
  display: "swap",
  adjustFontFallback: false, // Google Sans has no metrics in next/font's table
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
      <body>{children}</body>
    </html>
  );
}
