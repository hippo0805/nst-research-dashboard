import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "NST 리서치 보고서",
  description: "국가과학기술연구회 주요사업·예산·성과 대시보드",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="font-sans bg-gray-50">
        <Sidebar />
        <div className="md:ml-64">
          <Header />
          <main className="p-4 md:p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
