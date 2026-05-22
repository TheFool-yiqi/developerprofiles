import type { Project } from "../data/types";
import { publicUrl } from "../utils/publicUrl";
import { cardOnDark, cardOnLight } from "../utils/theme";

interface ProjectCardProps {
  project: Project;
  variant?: "dark" | "light";
}

export default function ProjectCard({
  project,
  variant = "light",
}: ProjectCardProps) {
  const imageSrc = project.image ? publicUrl(project.image) : undefined;
  const isLight = variant === "light";
  const card = isLight ? cardOnLight : cardOnDark;

  return (
    <article
      className={`flex h-full flex-col p-6 transition hover:-translate-y-1 ${card} ${
        isLight ? "hover:border-neutral-900" : "hover:border-neutral-500"
      }`}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={`${project.title} 封面`}
          className="mb-4 h-40 w-full rounded-2xl object-cover"
        />
      ) : null}
      <h3
        className={`text-lg font-semibold ${isLight ? "text-neutral-900" : "text-white"}`}
      >
        {project.title}
      </h3>
      <p
        className={`mt-2 flex-1 text-sm leading-relaxed ${
          isLight ? "text-neutral-600" : "text-neutral-400"
        }`}
      >
        {project.description}
      </p>
      {project.tech && project.tech.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li
              key={t}
              className={`rounded-md px-2 py-1 text-xs ${
                isLight
                  ? "bg-neutral-200 text-neutral-800"
                  : "bg-neutral-800 text-neutral-200"
              }`}
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
            className={
              isLight
                ? "rounded-full bg-black px-4 py-2 text-sm text-white transition hover:bg-neutral-800"
                : "rounded-full bg-white px-4 py-2 text-sm text-black transition hover:bg-neutral-200"
            }
          >
            预览
          </a>
        ) : null}
        {project.repo ? (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className={`rounded-full border px-4 py-2 text-sm transition ${
              isLight
                ? "border-neutral-400 text-neutral-800 hover:border-neutral-900"
                : "border-neutral-600 text-neutral-200 hover:border-white"
            }`}
          >
            源码
          </a>
        ) : null}
      </div>
    </article>
  );
}
