import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";

const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Aayush Gautam - Personal Website",
  description: "Aayush Gautam's personal website and portfolio.",
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Aayush Gautam" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body className={spaceMono.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
