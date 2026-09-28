import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Pinned to UTC: all dates in data/posts.ts are authored as UTC-midnight ISO
// strings, and formatting them in the visitor's local timezone (e.g. US/Canada
// evening hours) can roll early-of-month dates back a month — pinning avoids
// dates disagreeing between server-rendered (UTC) and client-hydrated (local
// timezone) output.
const MONTH_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
});

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
  const startYear = start.getUTCFullYear();
  const endYear = end.getUTCFullYear();

  if (startYear === endYear && startMonth === endMonth) {
    return `${startMonth} ${startYear}`;
  }
  if (startYear === endYear) {
    return `${startMonth} – ${endMonth} ${startYear}`;
  }
  return `${startMonth} ${startYear} – ${endMonth} ${endYear}`;
}
