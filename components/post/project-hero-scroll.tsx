"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { ImageContent } from "@/types/post";

interface ProjectHeroScrollProps {
  images: ImageContent[];
  className?: string;
}

/**
 * A project card's "hero" image slot. When a project has more than one
 * high-fidelity screenshot (`heroImages`), they auto-scroll horizontally in
 * a seamless, looping strip so a visitor sees several screens without
 * opening the project. With a single image it just renders statically,
 * matching the old thumbnail behaviour.
 *
 * The scrolling strip is `absolute`, not part of normal flow. A strip wide
 * enough to hold several duplicated screenshots can otherwise inflate the
 * width of its flex/grid ancestors (the card, the page grid, eventually the
 * whole page) even with `overflow-hidden` on its parent, because that
 * intrinsic width still gets counted while computing sizes further up the
 * tree. Taking the strip out of flow with `absolute` removes it from that
 * calculation entirely, so the box here is guaranteed to stay exactly the
 * size `className` gives it (the same size the static thumbnail used).
 */
export function ProjectHeroScroll({ images, className }: ProjectHeroScrollProps) {
  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div
        className={cn(
          "relative w-full h-48 overflow-hidden rounded-lg bg-muted/40",
          className
        )}
      >
        <Image
          src={images[0].url}
          alt={images[0].alt}
          fill
          className="object-contain p-4"
          priority
        />
      </div>
    );
  }

  // Duplicate the sequence so the strip can loop from -50% back to 0%
  // seamlessly (the two copies sit back to back).
  const loopImages = [...images, ...images];

  return (
    <div
      className={cn(
        "group relative w-full h-48 overflow-hidden rounded-lg bg-muted/40",
        className
      )}
    >
      <div className="absolute inset-y-0 left-0 flex h-full animate-loop-scroll group-hover:paused">
        {loopImages.map((image, index) => (
          <div
            key={`${image.url}-${index}`}
            className="relative h-full aspect-[4/3] shrink-0 px-2"
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-contain p-2"
              priority={index < images.length}
            />
          </div>
        ))}
      </div>
      {/* Edge fades so images don't appear to cut off abruptly */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-muted/40 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-muted/40 to-transparent" />
    </div>
  );
}
