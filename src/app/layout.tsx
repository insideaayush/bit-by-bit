import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";

const vt323 = VT323({ subsets: ["latin"], weight: "400" });

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
      <body className={vt323.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
