import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Re-exported so existing "@/lib/utils" imports keep working.
export { formatProjectDateRange } from "./date-range";
