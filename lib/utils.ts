import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const MONTH_FORMAT = new Intl.DateTimeFormat("en-US", { month: "short" });

/**
 * Formats a project's active period as a fixed range (e.g. "Jan – Apr 2026",
 * "Sep 2024 – Sep 2025") instead of a relative "updated X months ago" label,
 * which reads as stale the longer a project has been on the site.
 */
export function formatProjectDateRange(createdAt: string, updatedAt: string) {
  const start = new Date(createdAt);
  const end = new Date(updatedAt);

  const startMonth = MONTH_FORMAT.format(start);
  const endMonth = MONTH_FORMAT.format(end);
  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  if (startYear === endYear && startMonth === endMonth) {
    return `${startMonth} ${startYear}`;
  }
  if (startYear === endYear) {
    return `${startMonth} – ${endMonth} ${startYear}`;
  }
  return `${startMonth} ${startYear} – ${endMonth} ${endYear}`;
}
