import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auto-space-parking - A parking solution",
  description: "Generated by Auto-space-parking - A parking solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
