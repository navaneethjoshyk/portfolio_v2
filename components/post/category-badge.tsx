import {
  Stethoscope,
  HardHat,
  UtensilsCrossed,
  CreditCard,
  Heart,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CategoryStyle {
  icon: LucideIcon;
  iconClass: string;
  badgeClass: string;
  borderClass: string;
}

// Tailwind needs every class it applies to appear literally in source (no
// dynamic `text-${color}-500` interpolation), so each category's full set
// of classes is spelled out here rather than built from a color name.
const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  healthcare: {
    icon: Stethoscope,
    iconClass: "text-sky-500 dark:text-sky-400",
    badgeClass: "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
    borderClass: "border-l-sky-500 dark:border-l-sky-400",
  },
  "sustainable construction": {
    icon: HardHat,
    iconClass: "text-amber-500 dark:text-amber-400",
    badgeClass:
      "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    borderClass: "border-l-amber-500 dark:border-l-amber-400",
  },
  hospitality: {
    icon: UtensilsCrossed,
    iconClass: "text-rose-500 dark:text-rose-400",
    badgeClass: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
    borderClass: "border-l-rose-500 dark:border-l-rose-400",
  },
  fintech: {
    icon: CreditCard,
    iconClass: "text-violet-500 dark:text-violet-400",
    badgeClass:
      "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
    borderClass: "border-l-violet-500 dark:border-l-violet-400",
  },
  matrimony: {
    icon: Heart,
    iconClass: "text-pink-500 dark:text-pink-400",
    badgeClass: "bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
    borderClass: "border-l-pink-500 dark:border-l-pink-400",
  },
};

const DEFAULT_STYLE: CategoryStyle = {
  icon: Briefcase,
  iconClass: "text-slate-500 dark:text-slate-400",
  badgeClass:
    "bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-300",
  borderClass: "border-l-slate-400 dark:border-l-slate-500",
};

export function getCategoryStyle(category?: string): CategoryStyle {
  if (!category) return DEFAULT_STYLE;
  return CATEGORY_STYLES[category.toLowerCase()] ?? DEFAULT_STYLE;
}

interface CategoryBadgeProps {
  category?: string;
  className?: string;
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  if (!category) return null;
  const style = getCategoryStyle(category);
  const Icon = style.icon;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Icon className={cn("h-4 w-4", style.iconClass)} />
      <Badge variant="secondary" className={cn("text-xs", style.badgeClass)}>
        {category}
      </Badge>
    </div>
  );
}
