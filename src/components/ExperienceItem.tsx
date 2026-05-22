import { experienceTypeLabels, type Experience } from "../data/types";
import { formatPeriod } from "../utils/formatPeriod";

interface ExperienceItemProps {
  item: Experience;
}

export default function ExperienceItem({ item }: ExperienceItemProps) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-medium text-cyan-300">
          {experienceTypeLabels[item.type]}
        </span>
        <span className="text-sm text-neutral-500">
          {formatPeriod(item.startDate, item.endDate)}
        </span>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
      <p className="text-sm text-cyan-300/90">{item.company}</p>
      <p className="mt-3 text-sm leading-relaxed text-neutral-400">
        {item.description}
      </p>
    </article>
  );
}
