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
          <Pie data={data} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }: { name?: string; percent?: number }) => `${name ?? ""} ${((percent ?? 0) * 100).toFixed(0)}%`}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number | undefined) => `${(value ?? 0).toLocaleString()}억 원`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
