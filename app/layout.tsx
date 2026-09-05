import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portal UBK KTESA",
  description: "Portal Unit Bimbingan dan Kaunseling KTESA Shah Alam.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ms">
      <body className="antialiased">{children}</body>
    </html>
  );
}
