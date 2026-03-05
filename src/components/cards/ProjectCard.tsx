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
