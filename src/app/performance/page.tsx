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
