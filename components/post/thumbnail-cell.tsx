"use client";

import { ImageContent } from "@/types/post";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ThumbnailCellProps {
  content: ImageContent;
  className?: string;
}

export function ThumbnailCell({ content, className }: ThumbnailCellProps) {
  return (
    <div
      className={cn(
        "relative w-full h-48 overflow-hidden rounded-lg bg-muted/40",
        className
      )}
    >
      <Image
        src={content.url}
        alt={content.alt}
        fill
        className="object-contain p-4"
        priority
      />
    </div>
  );
}
