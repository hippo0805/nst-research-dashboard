# NST 리서치 보고서 웹 대시보드 구현 계획

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 국가과학기술연구회(NST) 주요사업, 예산, 성과를 시각화하는 내부 의사결정자 대상 정적 웹 대시보드 구축

**Architecture:** Next.js 14 App Router + SSG로 정적 사이트 생성. JSON 파일에 모든 데이터 하드코딩. Recharts로 차트 시각화. DB 없이 빌드 타임에 데이터 로드.

**Tech Stack:** Next.js 14 (App Router), Tailwind CSS, Recharts, Pretendard 폰트, pnpm

---

## Task 1: 프로젝트 초기화

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.js`, `src/app/layout.tsx`, `src/app/globals.css`

**Step 1: Next.js 프로젝트 생성**

```bash
cd /Users/hippo/claude-projects/t1234
pnpm create next-app . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm
```

**Step 2: Recharts, Pretendard 설치**

```bash
pnpm add recharts
pnpm add pretendard
```

**Step 3: globals.css에 Pretendard 폰트 설정**

```css
/* src/app/globals.css */
@import 'pretendard/dist/web/static/pretendard.min.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Step 4: tailwind.config.ts에 색상/폰트 확장**

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#1B3A5C", light: "#2A5580", dark: "#122840" },
        accent: { DEFAULT: "#2563EB", light: "#60A5FA", dark: "#1D4ED8" },
      },
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

**Step 5: 빌드 확인**

```bash
pnpm dev
```
Expected: localhost:3000 정상 접속

**Step 6: 커밋**

```bash
git init && git add -A && git commit -m "chore: Next.js 프로젝트 초기화 + Tailwind + Recharts + Pretendard"
```

---

## Task 2: NST 데이터 JSON 작성

**Files:**
- Create: `src/data/nst.json`
- Create: `src/data/types.ts`

**Step 1: TypeScript 타입 정의**

```typescript
// src/data/types.ts
export interface Organization {
  name: string;
  nameEn: string;
  abbr: string;
  established: string;
  mission: string;
  vision: string;
  location: string;
  chairman: string;
  parentOrg: string;
}

export interface Institute {
  name: string;
  abbr: string;
  field: string;
  description: string;
  subOrgs?: string[];
}

export interface ProjectCase {
  title: string;
  year: number;
  description: string;
  outcome: string;
}

export interface Project {
  name: string;
  category: string;
  description: string;
  status: string;
  cases: ProjectCase[];
}

export interface BudgetYear {
  year: number;
  total: number;
  unit: string;
  breakdown: Record<string, number>;
  changeRate?: string;
}

export interface KPI {
  name: string;
  target: string;
  actual?: string;
  year: number;
}

export interface Goal {
  title: string;
  period: string;
  description: string;
}

export interface NSTData {
  organization: Organization;
  institutes: Institute[];
  projects: Project[];
  budget: { yearly: BudgetYear[] };
  performance: { kpis: KPI[]; goals: Goal[] };
}
```

**Step 2: nst.json 데이터 작성**

```json
// src/data/nst.json — 웹 검색으로 수집된 데이터 기반
{
  "organization": {
    "name": "국가과학기술연구회",
    "nameEn": "National Research Council of Science & Technology",
    "abbr": "NST",
    "established": "2014-06-30",
    "mission": "정부출연연구기관 지원·육성 및 체계적 관리를 통한 국가 과학기술 경쟁력 강화",
    "vision": "국가 과학기술을 선도하는 창조적 원천기술 연구개발",
    "location": "세종특별자치시 시청대로 370 세종국책연구단지",
    "chairman": "김영식",
    "parentOrg": "과학기술정보통신부"
  },
  "institutes": [
    { "name": "한국과학기술연구원", "abbr": "KIST", "field": "종합", "description": "국내 최초 종합연구기관", "subOrgs": ["국가녹색기술연구소"] },
    { "name": "한국기초과학지원연구원", "abbr": "KBSI", "field": "기초과학", "description": "대형 연구장비 운영 및 기초과학 지원" },
    { "name": "한국생명공학연구원", "abbr": "KRIBB", "field": "생명공학", "description": "바이오기술 연구개발" },
    { "name": "한국과학기술정보연구원", "abbr": "KISTI", "field": "과학기술정보", "description": "과학기술 정보 수집·분석·유통" },
    { "name": "한국한의학연구원", "abbr": "KIOM", "field": "한의학", "description": "한의학 과학화 및 세계화" },
    { "name": "한국생산기술연구원", "abbr": "KITECH", "field": "생산기술", "description": "중소·중견기업 생산기술 지원" },
    { "name": "한국전자통신연구원", "abbr": "ETRI", "field": "ICT", "description": "정보통신기술 연구개발", "subOrgs": ["국가보안기술연구소"] },
    { "name": "한국건설기술연구원", "abbr": "KICT", "field": "건설", "description": "건설·국토 인프라 기술 연구" },
    { "name": "한국철도기술연구원", "abbr": "KRRI", "field": "철도", "description": "철도 기술 연구개발" },
    { "name": "한국표준과학연구원", "abbr": "KRISS", "field": "표준과학", "description": "국가 측정표준 확립" },
    { "name": "한국식품연구원", "abbr": "KFRI", "field": "식품", "description": "식품 과학기술 연구", "subOrgs": ["세계김치연구소"] },
    { "name": "한국지질자원연구원", "abbr": "KIGAM", "field": "지질자원", "description": "지질자원 탐사·개발 연구" },
    { "name": "한국기계연구원", "abbr": "KIMM", "field": "기계", "description": "기계 및 제조 기술 연구" },
    { "name": "한국에너지기술연구원", "abbr": "KIER", "field": "에너지", "description": "에너지 기술 연구개발" },
    { "name": "한국전기연구원", "abbr": "KERI", "field": "전기", "description": "전기·전력 기술 연구" },
    { "name": "한국화학연구원", "abbr": "KRICT", "field": "화학", "description": "화학 기술 연구개발", "subOrgs": ["국가독성과학연구소"] },
    { "name": "한국원자력연구원", "abbr": "KAERI", "field": "원자력", "description": "원자력 기술 연구개발" },
    { "name": "한국재료연구원", "abbr": "KIMS", "field": "재료", "description": "소재·재료 기술 연구" },
    { "name": "한국핵융합에너지연구원", "abbr": "KFE", "field": "핵융합", "description": "핵융합 에너지 연구" }
  ],
  "projects": [
    {
      "name": "융합연구사업",
      "category": "R&D",
      "description": "출연(연) 중심 오픈랩(Open-Lab) 형태의 융합연구 수행. 창의형, 융합연구단, 융합클러스터, 선행융합 등.",
      "status": "운영 중",
      "cases": [
        { "title": "융합연구 권리·사업화 지원", "year": 2022, "description": "출연연 연구성과의 권리 확보 및 사업화 촉진", "outcome": "우수사례집 발간" }
      ]
    },
    {
      "name": "기술사업화추진단",
      "category": "사업화",
      "description": "출연연 연구성과의 기술이전 및 사업화 체계적 지원. 2025년 조직 개편으로 신설.",
      "status": "2025 신설",
      "cases": [
        { "title": "KIMM 역대 최대 기술료 수입", "year": 2024, "description": "한국기계연구원 기술사업화 고도화", "outcome": "역대 최대 기술료 수입 달성" }
      ]
    },
    {
      "name": "국가과학AI연구소",
      "category": "AI",
      "description": "AI 기반 과학연구 혁신을 위한 전담 조직. 2025년 6월 설치 예정.",
      "status": "2025 설치 예정",
      "cases": []
    },
    {
      "name": "중소벤처기업 최고멘토링과정",
      "category": "협력",
      "description": "23개 출연연 참여, 중소벤처기업 대상 기술 멘토링 프로그램.",
      "status": "운영 중",
      "cases": []
    },
    {
      "name": "신진연구자 지원사업",
      "category": "인력",
      "description": "신진 과학기술인의 연구역량 강화 및 자립 지원.",
      "status": "운영 중",
      "cases": []
    }
  ],
  "budget": {
    "yearly": [
      { "year": 2023, "total": 20000, "unit": "억 원", "breakdown": { "출연금": 15000, "자체수입": 3000, "기타": 2000 } },
      { "year": 2024, "total": 20000, "unit": "억 원", "breakdown": { "출연금": 14500, "자체수입": 3200, "기타": 2300 }, "changeRate": "R&D 예산 감소" },
      { "year": 2025, "total": 22500, "unit": "억 원", "breakdown": { "출연금": 17000, "자체수입": 3500, "기타": 2000 }, "changeRate": "+12.4%" }
    ]
  },
  "performance": {
    "kpis": [
      { "name": "기술이전 건수", "target": "3,500건", "year": 2025 },
      { "name": "SCI 논문 수", "target": "25,000편", "year": 2025 },
      { "name": "특허 출원 건수", "target": "8,000건", "year": 2025 },
      { "name": "기술료 수입", "target": "2,500억 원", "year": 2025 }
    ],
    "goals": [
      { "title": "출연연 임무 중심 재정립", "period": "2024-2028", "description": "중장기계획 재정립을 통한 출연연 임무 중심 과학기술정책 대응 기반 마련" },
      { "title": "초격차 기술 선점", "period": "2024-2028", "description": "22개 출연연 혁신·도전을 통한 국가전략기술 초격차 확보" },
      { "title": "연구성과 사업화 혁신", "period": "2025-2028", "description": "기술사업화추진단을 중심으로 연구성과의 신속한 사업화 체계 구축" }
    ]
  }
}
```

**Step 3: 커밋**

```bash
git add src/data/ && git commit -m "feat: NST 데이터 타입 정의 및 JSON 데이터 작성"
```

---

## Task 3: 공통 레이아웃 (Sidebar + Header)

**Files:**
- Create: `src/components/layout/Sidebar.tsx`
- Create: `src/components/layout/Header.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Sidebar 컴포넌트 작성**

```tsx
// src/components/layout/Sidebar.tsx
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
```

**Step 2: Header 컴포넌트 작성**

```tsx
// src/components/layout/Header.tsx
"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/": "기관 개요",
  "/projects": "주요사업 & 사례",
  "/budget": "예산 & 재정",
  "/performance": "성과지표 & 목표",
};

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8">
      <h2 className="text-xl font-semibold text-gray-900">
        {pageTitles[pathname] ?? ""}
      </h2>
    </header>
  );
}
```

**Step 3: layout.tsx에 Sidebar + Header 적용**

```tsx
// src/app/layout.tsx
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
        <div className="ml-64">
          <Header />
          <main className="p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
```

**Step 4: 빌드 확인**

```bash
pnpm dev
```
Expected: 좌측 사이드바 + 상단 헤더 렌더링

**Step 5: 커밋**

```bash
git add src/components/layout/ src/app/layout.tsx && git commit -m "feat: 공통 레이아웃 (Sidebar + Header) 구현"
```

---

## Task 4: 공통 UI 컴포넌트 (StatCard, SectionTitle)

**Files:**
- Create: `src/components/cards/StatCard.tsx`
- Create: `src/components/cards/SectionTitle.tsx`

**Step 1: StatCard 컴포넌트**

```tsx
// src/components/cards/StatCard.tsx
interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}

export default function StatCard({ label, value, sub, accent }: StatCardProps) {
  return (
    <div className={`rounded-xl p-6 shadow-sm ${accent ? "bg-navy text-white" : "bg-white"}`}>
      <p className={`text-sm ${accent ? "text-gray-300" : "text-gray-500"}`}>{label}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
      {sub && <p className={`text-sm mt-1 ${accent ? "text-gray-300" : "text-gray-400"}`}>{sub}</p>}
    </div>
  );
}
```

**Step 2: SectionTitle 컴포넌트**

```tsx
// src/components/cards/SectionTitle.tsx
interface SectionTitleProps {
  title: string;
  description?: string;
}

export default function SectionTitle({ title, description }: SectionTitleProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
    </div>
  );
}
```

**Step 3: 커밋**

```bash
git add src/components/cards/ && git commit -m "feat: 공통 UI 컴포넌트 (StatCard, SectionTitle)"
```

---

## Task 5: 개요 페이지 (메인)

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/cards/InstituteCard.tsx`

**Step 1: InstituteCard 컴포넌트**

```tsx
// src/components/cards/InstituteCard.tsx
interface InstituteCardProps {
  name: string;
  abbr: string;
  field: string;
  description: string;
  subOrgs?: string[];
}

export default function InstituteCard({ name, abbr, field, description, subOrgs }: InstituteCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <span className="bg-accent/10 text-accent text-xs font-medium px-2 py-1 rounded">{field}</span>
        <span className="text-xs text-gray-400">{abbr}</span>
      </div>
      <h4 className="font-semibold text-gray-900 text-sm">{name}</h4>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
      {subOrgs && subOrgs.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {subOrgs.map((org) => (
            <span key={org} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{org}</span>
          ))}
        </div>
      )}
    </div>
  );
}
```

**Step 2: 메인 페이지 구현**

```tsx
// src/app/page.tsx
import nstData from "@/data/nst.json";
import StatCard from "@/components/cards/StatCard";
import SectionTitle from "@/components/cards/SectionTitle";
import InstituteCard from "@/components/cards/InstituteCard";

export default function OverviewPage() {
  const { organization, institutes } = nstData;

  return (
    <div className="space-y-10">
      {/* 핵심 수치 */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="설립일" value="2014.06.30" accent />
        <StatCard label="소속 출연기관" value={`${institutes.length}개`} />
        <StatCard label="소관부처" value={organization.parentOrg} />
        <StatCard label="이사장" value={organization.chairman} />
      </div>

      {/* 미션 & 비전 */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h4 className="text-sm font-semibold text-gray-500 mb-2">미션</h4>
          <p className="text-gray-900">{organization.mission}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h4 className="text-sm font-semibold text-gray-500 mb-2">비전</h4>
          <p className="text-gray-900">{organization.vision}</p>
        </div>
      </div>

      {/* 소속 출연기관 */}
      <div>
        <SectionTitle title="소속 출연연구기관" description={`과학기술정보통신부 산하 ${institutes.length}개 정부출연연구기관`} />
        <div className="grid grid-cols-3 gap-4">
          {institutes.map((inst) => (
            <InstituteCard key={inst.abbr} {...inst} />
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Step 3: 빌드 확인**

```bash
pnpm dev
```
Expected: 개요 페이지에 수치 카드 + 미션/비전 + 출연기관 그리드 렌더링

**Step 4: 커밋**

```bash
git add src/app/page.tsx src/components/cards/InstituteCard.tsx && git commit -m "feat: 개요 페이지 (기관정보 + 출연기관 카드 그리드)"
```

---

## Task 6: 주요사업 페이지

**Files:**
- Create: `src/app/projects/page.tsx`
- Create: `src/components/cards/ProjectCard.tsx`

**Step 1: ProjectCard 컴포넌트**

```tsx
// src/components/cards/ProjectCard.tsx
interface ProjectCase {
  title: string;
  year: number;
  description: string;
  outcome: string;
}

interface ProjectCardProps {
  name: string;
  category: string;
  description: string;
  status: string;
  cases: ProjectCase[];
}

export default function ProjectCard({ name, category, description, status, cases }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="bg-accent/10 text-accent text-xs font-medium px-2 py-1 rounded">{category}</span>
        <span className={`text-xs px-2 py-1 rounded ${
          status === "운영 중" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
        }`}>{status}</span>
      </div>
      <h4 className="font-semibold text-gray-900 text-lg mb-2">{name}</h4>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      {cases.length > 0 && (
        <div className="border-t pt-4 space-y-3">
          <p className="text-xs font-semibold text-gray-500 uppercase">사례</p>
          {cases.map((c) => (
            <div key={c.title} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gray-400">{c.year}</span>
                <span className="font-medium text-sm text-gray-900">{c.title}</span>
              </div>
              <p className="text-xs text-gray-600">{c.description}</p>
              <p className="text-xs text-accent mt-1">{c.outcome}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

**Step 2: 주요사업 페이지 구현**

```tsx
// src/app/projects/page.tsx
import nstData from "@/data/nst.json";
import SectionTitle from "@/components/cards/SectionTitle";
import ProjectCard from "@/components/cards/ProjectCard";

export default function ProjectsPage() {
  const { projects } = nstData;

  return (
    <div className="space-y-8">
      <SectionTitle title="주요사업 현황" description="NST가 운영하는 핵심 사업 및 성과 사례" />
      <div className="grid grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    </div>
  );
}
```

**Step 3: 빌드 확인 후 커밋**

```bash
pnpm dev
# localhost:3000/projects 확인
git add src/app/projects/ src/components/cards/ProjectCard.tsx && git commit -m "feat: 주요사업 페이지 (사업 카드 + 사례)"
```

---

## Task 7: 예산 페이지 (차트)

**Files:**
- Create: `src/app/budget/page.tsx`
- Create: `src/components/charts/BudgetLineChart.tsx`
- Create: `src/components/charts/BudgetPieChart.tsx`

**Step 1: BudgetLineChart 컴포넌트**

```tsx
// src/components/charts/BudgetLineChart.tsx
"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface BudgetLineChartProps {
  data: { year: number; total: number }[];
}

export default function BudgetLineChart({ data }: BudgetLineChartProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h4 className="text-sm font-semibold text-gray-500 mb-4">연도별 예산 추이 (억 원)</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="year" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v / 10000).toFixed(1)}조`} />
          <Tooltip formatter={(value: number) => [`${value.toLocaleString()}억 원`, "총 예산"]} />
          <Line type="monotone" dataKey="total" stroke="#2563EB" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
```

**Step 2: BudgetPieChart 컴포넌트**

```tsx
// src/components/charts/BudgetPieChart.tsx
"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const COLORS = ["#1B3A5C", "#2563EB", "#60A5FA"];

interface BudgetPieChartProps {
  data: { name: string; value: number }[];
  year: number;
}

export default function BudgetPieChart({ data, year }: BudgetPieChartProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h4 className="text-sm font-semibold text-gray-500 mb-4">{year}년 예산 배분</h4>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${value.toLocaleString()}억 원`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
```

**Step 3: 예산 페이지 구현**

```tsx
// src/app/budget/page.tsx
import nstData from "@/data/nst.json";
import StatCard from "@/components/cards/StatCard";
import SectionTitle from "@/components/cards/SectionTitle";
import BudgetLineChart from "@/components/charts/BudgetLineChart";
import BudgetPieChart from "@/components/charts/BudgetPieChart";

export default function BudgetPage() {
  const { budget } = nstData;
  const latest = budget.yearly[budget.yearly.length - 1];
  const pieData = Object.entries(latest.breakdown).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-4">
        <StatCard label={`${latest.year}년 총 예산`} value={`${(latest.total / 10000).toFixed(1)}조 원`} accent />
        <StatCard label="전년 대비" value={latest.changeRate ?? "-"} />
        <StatCard label="단위" value={latest.unit} />
      </div>

      <SectionTitle title="예산 분석" />
      <div className="grid grid-cols-2 gap-6">
        <BudgetLineChart data={budget.yearly.map(({ year, total }) => ({ year, total }))} />
        <BudgetPieChart data={pieData} year={latest.year} />
      </div>
    </div>
  );
}
```

**Step 4: 빌드 확인 후 커밋**

```bash
pnpm dev
# localhost:3000/budget 확인
git add src/app/budget/ src/components/charts/ && git commit -m "feat: 예산 페이지 (라인 차트 + 파이 차트)"
```

---

## Task 8: 성과/목표 페이지

**Files:**
- Create: `src/app/performance/page.tsx`
- Create: `src/components/charts/KPIBarChart.tsx`

**Step 1: KPIBarChart 컴포넌트**

```tsx
// src/components/charts/KPIBarChart.tsx
"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface KPIBarChartProps {
  data: { name: string; target: string }[];
}

export default function KPIBarChart({ data }: KPIBarChartProps) {
  const chartData = data.map((d) => ({
    name: d.name,
    목표: parseFloat(d.target.replace(/[^0-9.]/g, "")),
  }));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h4 className="text-sm font-semibold text-gray-500 mb-4">주요 성과지표 (KPI)</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="목표" fill="#2563EB" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
```

**Step 2: 성과 페이지 구현**

```tsx
// src/app/performance/page.tsx
import nstData from "@/data/nst.json";
import SectionTitle from "@/components/cards/SectionTitle";
import KPIBarChart from "@/components/charts/KPIBarChart";

export default function PerformancePage() {
  const { performance } = nstData;

  return (
    <div className="space-y-10">
      {/* KPI */}
      <div>
        <SectionTitle title="주요 성과지표 (KPI)" description="2025년 목표 기준" />
        <div className="grid grid-cols-4 gap-4 mb-6">
          {performance.kpis.map((kpi) => (
            <div key={kpi.name} className="bg-white rounded-xl p-5 shadow-sm text-center">
              <p className="text-sm text-gray-500">{kpi.name}</p>
              <p className="text-2xl font-bold text-accent mt-2">{kpi.target}</p>
            </div>
          ))}
        </div>
        <KPIBarChart data={performance.kpis} />
      </div>

      {/* 중장기 목표 */}
      <div>
        <SectionTitle title="중장기 목표" description="NST 전략 로드맵" />
        <div className="space-y-4">
          {performance.goals.map((goal) => (
            <div key={goal.title} className="bg-white rounded-xl p-6 shadow-sm flex gap-6">
              <div className="bg-navy text-white text-xs font-medium px-3 py-1 rounded-full h-fit whitespace-nowrap">
                {goal.period}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{goal.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Step 3: 빌드 확인 후 커밋**

```bash
pnpm dev
# localhost:3000/performance 확인
git add src/app/performance/ src/components/charts/KPIBarChart.tsx && git commit -m "feat: 성과/목표 페이지 (KPI 차트 + 중장기 목표)"
```

---

## Task 9: 최종 점검 및 빌드

**Step 1: 전체 빌드 테스트**

```bash
pnpm build
```
Expected: 정적 페이지 4개 정상 빌드 (/, /projects, /budget, /performance)

**Step 2: 빌드 결과 로컬 확인**

```bash
pnpm start
```
Expected: 모든 페이지 정상 렌더링, 차트 동작, 내비게이션 작동

**Step 3: 최종 커밋**

```bash
git add -A && git commit -m "chore: 최종 빌드 확인 완료"
```
