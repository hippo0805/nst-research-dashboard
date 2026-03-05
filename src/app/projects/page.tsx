import nstData from "@/data/nst.json";
import SectionTitle from "@/components/cards/SectionTitle";
import ProjectCard from "@/components/cards/ProjectCard";

export default function ProjectsPage() {
  const { projects } = nstData;

  return (
    <div className="space-y-8">
      <SectionTitle title="주요사업 현황" description="NST가 운영하는 핵심 사업 및 성과 사례" />
      <div className="grid grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    </div>
  );
}
