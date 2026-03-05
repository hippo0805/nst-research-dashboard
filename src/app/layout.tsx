import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NST 연구성과 대시보드",
  description: "국가과학기술연구회 연구성과 대시보드",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
