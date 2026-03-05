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
        <SectionTitle title="소속 출연연구기관" description={`과학기술정보통신부 산하 ${institutes.length}개 정부출연연구기관 (2024년 우주항공청 출범으로 항공우주연·천문연 이관)`} />
        <div className="grid grid-cols-3 gap-4">
          {institutes.map((inst) => (
            <InstituteCard key={inst.abbr} {...inst} />
          ))}
        </div>
      </div>

      {/* 출처 */}
      <div className="bg-gray-100 rounded-xl p-5 text-xs text-gray-500">
        <p className="font-semibold mb-2">출처</p>
        <ul className="space-y-1">
          {nstData.sources.map((s) => (
            <li key={s.name}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent underline">{s.name}</a>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-gray-400">데이터 기준일: {nstData.organization.dataAsOf}</p>
      </div>
    </div>
  );
}
