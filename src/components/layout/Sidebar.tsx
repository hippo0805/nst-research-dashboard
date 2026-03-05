"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "기관 개요", icon: "🏛" },
  { href: "/projects", label: "주요사업", icon: "📋" },
  { href: "/budget", label: "예산·재정", icon: "💰" },
  { href: "/global-top", label: "글로벌TOP연구단", icon: "🚀" },
  { href: "/performance", label: "성과·목표", icon: "📊" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-3 left-3 z-50 md:hidden bg-navy text-white p-2 rounded-lg"
        aria-label="메뉴 열기"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen w-64 bg-navy text-white flex flex-col z-50 transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className="p-6 border-b border-navy-light flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">NST</h1>
            <p className="text-sm text-gray-300 mt-1">국가과학기술연구회</p>
          </div>
          <button onClick={() => setOpen(false)} className="md:hidden text-gray-300 hover:text-white" aria-label="메뉴 닫기">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
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
          리서치 보고서 2026
        </div>
      </aside>
    </>
  );
}
