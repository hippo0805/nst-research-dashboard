"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "기관 개요", icon: "🏛" },
  { href: "/projects", label: "주요사업", icon: "📋" },
  { href: "/budget", label: "예산·재정", icon: "💰" },
  { href: "/performance", label: "성과·목표", icon: "📊" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-navy text-white flex flex-col">
      <div className="p-6 border-b border-navy-light">
        <h1 className="text-lg font-bold">NST</h1>
        <p className="text-sm text-gray-300 mt-1">국가과학기술연구회</p>
      </div>
      <nav className="flex-1 py-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
              pathname === item.href
                ? "bg-navy-light text-white font-medium"
                : "text-gray-300 hover:bg-navy-light hover:text-white"
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 text-xs text-gray-400 border-t border-navy-light">
        리서치 보고서 2025
      </div>
    </aside>
  );
}
