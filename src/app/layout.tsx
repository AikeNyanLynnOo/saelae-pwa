import type { Metadata, Viewport } from "next";
import { Noto_Sans_Myanmar, Figtree, Manrope } from "next/font/google";
import "@/app/globals.css";
import "@/lib/tokens.css";
import RootLayoutClient from "@/app/RootLayoutClient";

const notoMyanmar = Noto_Sans_Myanmar({
  subsets: ["myanmar"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-saelae",
  display: "swap",
  fallback: ["sans-serif"],
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SaeLae - Song to your Happy Home",
  description:
    "SaeLae is a family-friendly web app designed to help parents and caregivers share knowledge and medical insights about baby care. Whether you're a first-time parent or an experienced caregiver, this platform provides a trusted space to access expert-backed information and share real-life experiences.",
  generator: "Next.js",
  manifest: "./manifest.json",
  keywords: ["saelae", "baby care", "family", "next-pwa"],
  authors: [
    {
      name: "aikenyanlynnoo",
      url: "https://www.linkedin.com/in/aikeoo/",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "icon512_rounded.png" },
    { rel: "icon", url: "icon512_rounded.png" },
  ],
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>
      <body
        className={`${notoMyanmar.variable} ${figtree.variable} ${manrope.variable}`}
      >
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
