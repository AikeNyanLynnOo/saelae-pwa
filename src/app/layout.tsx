import type { Metadata } from "next";
import { Noto_Sans_Myanmar } from "next/font/google";
import "./globals.css";
import "../lib/tokens.css";
import RootLayoutClient from "./RootLayoutClient";

const notoMyanmar = Noto_Sans_Myanmar({
  subsets: ["myanmar"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-selel",
  display: "swap",
  fallback: ["sans-serif"],
});

export const metadata: Metadata = {
  title: "SaeLae - Song to your Happy Home",
  description: "It's a simple progressive web application made with NextJS",
  generator: "Next.js",
  manifest: "/web.manifest",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  authors: [
    {
      name: "aikenyanlynnoo",
      url: "https://www.linkedin.com/in/aikeoo/",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "images/icons/icon.png" },
    { rel: "icon", url: "images/icons/icon.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/web.manifest" />
      </head>
      <body className={notoMyanmar.className}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
