import { motion } from "framer-motion";
import type { Profile } from "../data/types";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";

interface ProjectsProps {
  profile: Profile;
}

export default function Projects({ profile }: ProjectsProps) {
  const projects = profile.projects ?? [];

  return (
    <motion.section
      id="projects"
      className="scroll-mt-24 py-20 md:py-24"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading title="项目" subtitle="代表性作品与实践案例" />
        <ul className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <li key={`${project.title}-${project.repo ?? project.link ?? ""}`}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
