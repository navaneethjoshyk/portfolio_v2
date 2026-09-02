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

// Icon only varies by category — no per-category color, so every card
// reads the same regardless of industry.
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  healthcare: Stethoscope,
  "sustainable construction": HardHat,
  hospitality: UtensilsCrossed,
  fintech: CreditCard,
  matrimony: Heart,
};

function getCategoryIcon(category?: string): LucideIcon {
  if (!category) return Briefcase;
  return CATEGORY_ICONS[category.toLowerCase()] ?? Briefcase;
}

interface CategoryBadgeProps {
  category?: string;
  className?: string;
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  if (!category) return null;
  const Icon = getCategoryIcon(category);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Icon className="h-4 w-4 text-muted-foreground" />
      <Badge variant="secondary" className="text-xs">
        {category}
      </Badge>
    </div>
  );
}
