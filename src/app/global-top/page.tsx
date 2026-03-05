import nstData from "@/data/nst.json";
import StatCard from "@/components/cards/StatCard";
import SectionTitle from "@/components/cards/SectionTitle";

export default function GlobalTopPage() {
  const { globalTop } = nstData;

  return (
    <div className="space-y-8">
      {/* 개요 */}
      <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
        <p className="text-sm text-gray-600">{globalTop.description}</p>
      </div>

      {/* 핵심 수치 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <StatCard label="총 사업비" value="6,100억 원" accent />
        <StatCard label="사업 기간" value="5년" sub="2025.5 ~ 2030.4" />
        <StatCard label="제안 / 선정" value={`${globalTop.proposals} → ${globalTop.selected}개`} />
        <StatCard label="유형" value="2개 트랙" sub="국가전략 + 미래도전" />
      </div>

      {/* 국가전략형 */}
      <div>
        <SectionTitle
          title={`${globalTop.strategic.label} (${globalTop.strategic.groups.length}개)`}
          description={`${globalTop.strategic.annualBudget} 지원 · 세계 최고 수준 국가전략기술 확보 목표`}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
          {globalTop.strategic.groups.map((g) => (
            <div key={g.name} className="bg-white rounded-xl p-5 md:p-6 shadow-sm border-l-4 border-navy">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h4 className="font-semibold text-gray-900">{g.name}</h4>
                {g.budget !== "-" && (
                  <span className="text-sm font-bold text-navy whitespace-nowrap">{g.budget}</span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-3">{g.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">주관</span>
                <span className="text-xs font-medium bg-navy/10 text-navy px-2 py-0.5 rounded">{g.lead}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 미래도전형 */}
      <div>
        <SectionTitle
          title={`${globalTop.future.label} (${globalTop.future.groups.length}개)`}
          description={`${globalTop.future.annualBudget} 지원 · 미래 원천기술 선점 목표`}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
          {globalTop.future.groups.map((g) => (
            <div key={g.name} className="bg-white rounded-xl p-5 md:p-6 shadow-sm border-l-4 border-accent">
              <h4 className="font-semibold text-gray-900 mb-2">{g.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{g.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">주관</span>
                <span className="text-xs font-medium bg-accent/10 text-accent px-2 py-0.5 rounded">{g.lead}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 선정 프로세스 */}
      <div className="bg-gray-100 rounded-xl p-5 text-sm text-gray-600">
        <p className="font-semibold text-gray-700 mb-2">선정 과정</p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs">
          <span className="bg-white px-3 py-1.5 rounded-lg">제안서 접수 (77건)</span>
          <span className="hidden sm:block text-gray-400">→</span>
          <span className="bg-white px-3 py-1.5 rounded-lg">4개월 평가</span>
          <span className="hidden sm:block text-gray-400">→</span>
          <span className="bg-white px-3 py-1.5 rounded-lg">최종 10개 선정</span>
        </div>
        <p className="mt-3 text-xs text-gray-400">출처: {globalTop.source}</p>
      </div>
    </div>
  );
}
