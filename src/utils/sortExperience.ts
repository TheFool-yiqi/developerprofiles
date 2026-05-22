import type { Experience } from "../data/types";

function normalizeEnd(end: string): string {
  return end === "present" ? "9999-12" : end;
}

export function sortExperience(items: Experience[]): Experience[] {
  return [...items].sort((a, b) => {
    const startCmp = b.startDate.localeCompare(a.startDate);
    if (startCmp !== 0) return startCmp;
    return normalizeEnd(b.endDate).localeCompare(normalizeEnd(a.endDate));
  });
}
