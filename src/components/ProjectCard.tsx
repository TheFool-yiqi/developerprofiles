import type { Project } from "../data/types";
import { publicUrl } from "../utils/publicUrl";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const imageSrc = project.image ? publicUrl(project.image) : undefined;

  return (
    <article className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-cyan-400/30">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={`${project.title} 封面`}
          className="mb-4 h-40 w-full rounded-2xl object-cover"
        />
      ) : null}
      <h3 className="text-lg font-semibold text-white">{project.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-400">
        {project.description}
      </p>
      {project.tech && project.tech.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-md bg-cyan-400/10 px-2 py-1 text-xs text-cyan-300"
            >
              {t}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-5 flex flex-wrap gap-3">
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-cyan-400/40 px-4 py-2 text-sm text-cyan-300 transition hover:bg-cyan-400/10"
          >
            预览
          </a>
        ) : null}
        {project.repo ? (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/15 px-4 py-2 text-sm text-neutral-200 transition hover:bg-white/10"
          >
            源码
          </a>
        ) : null}
      </div>
    </article>
  );
}
