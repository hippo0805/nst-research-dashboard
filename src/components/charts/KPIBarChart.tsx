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
