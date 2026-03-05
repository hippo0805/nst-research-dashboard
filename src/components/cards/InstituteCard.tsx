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
