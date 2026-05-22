export function formatPeriod(startDate: string, endDate: string): string {
  const endLabel = endDate === "present" ? "至今" : endDate;
  return `${startDate} — ${endLabel}`;
}
