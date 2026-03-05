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

      {budget.note && (
        <div className="bg-gray-100 rounded-xl p-5 text-sm text-gray-600">
          <p className="font-semibold text-gray-700 mb-1">참고</p>
          <p>{budget.note}</p>
        </div>
      )}
    </div>
  );
}
