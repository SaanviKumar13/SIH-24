import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portal",
  description: "SSMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-heading bg-primary">{children}</body>
    </html>
  );
}
