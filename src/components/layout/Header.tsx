"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/": "기관 개요",
  "/projects": "주요사업 & 사례",
  "/budget": "예산 & 재정",
  "/global-top": "글로벌 TOP 전략연구단",
  "/performance": "성과지표 & 목표",
};

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="h-14 md:h-16 bg-white border-b border-gray-200 flex items-center px-4 md:px-8 pl-14 md:pl-8">
      <h2 className="text-lg md:text-xl font-semibold text-gray-900">
        {pageTitles[pathname] ?? ""}
      </h2>
    </header>
  );
}
