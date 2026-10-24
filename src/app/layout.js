import { Google_Sans, Inter } from "next/font/google";
import "./globals.css";

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${googleSans.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
