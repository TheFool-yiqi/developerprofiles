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
        isLight ? "hover:border-panda-black" : "hover:border-panda-gray"
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
        className={`text-lg font-semibold ${isLight ? "text-panda-black" : "text-panda-white"}`}
      >
        {project.title}
      </h3>
      <p
        className={`mt-2 flex-1 text-sm leading-relaxed ${
          isLight ? "text-panda-black/70" : "text-panda-gray"
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
                  ? "bg-panda-cream text-panda-black"
                  : "bg-panda-charcoal text-panda-cream"
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
                ? "rounded-full bg-panda-black px-4 py-2 text-sm text-panda-white transition hover:bg-panda-charcoal"
                : "rounded-full bg-panda-white px-4 py-2 text-sm text-panda-black transition hover:bg-panda-cream"
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
                ? "border-panda-gray text-panda-black hover:border-panda-black"
                : "border-panda-charcoal text-panda-cream hover:border-panda-white"
            }`}
          >
            源码
          </a>
        ) : null}
      </div>
    </article>
  );
}
