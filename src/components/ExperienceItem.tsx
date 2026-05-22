import { experienceTypeLabels, type Experience } from "../data/types";
import { formatPeriod } from "../utils/formatPeriod";
import { cardOnDark } from "../utils/theme";

interface ExperienceItemProps {
  item: Experience;
}

export default function ExperienceItem({ item }: ExperienceItemProps) {
  return (
    <article className={`p-6 ${cardOnDark}`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-neutral-600 bg-neutral-800 px-3 py-1 text-xs font-medium text-neutral-200">
          {experienceTypeLabels[item.type]}
        </span>
        <span className="text-sm text-neutral-500">
          {formatPeriod(item.startDate, item.endDate)}
        </span>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
      <p className="text-sm text-neutral-300">{item.company}</p>
      <p className="mt-3 text-sm leading-relaxed text-neutral-400">
        {item.description}
      </p>
    </article>
  );
}
