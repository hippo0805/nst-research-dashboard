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
