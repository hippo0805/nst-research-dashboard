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
          <Tooltip formatter={(value: number | undefined) => [`${(value ?? 0).toLocaleString()}억 원`, "총 예산"]} />
          <Line type="monotone" dataKey="total" stroke="#2563EB" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
