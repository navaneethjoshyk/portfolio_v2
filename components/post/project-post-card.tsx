"use client";

import { Post } from "@/types/post";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CategoryBadge } from "./category-badge";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { cn, formatProjectDateRange } from "@/lib/utils";

interface ProjectPostCardProps {
  post: Post;
  variant?: "default" | "compact";
}

export function ProjectPostCard({
  post,
  variant = "default",
}: ProjectPostCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);
  // A fixed range ("Jan – Apr 2026") instead of a relative "9 months ago"
  // label, which only ever makes the work look older.
  const formattedDate = formatProjectDateRange(post.createdAt, post.updatedAt);
  const previewContent = post.excerpt || "";
  const isCompact = variant === "compact";

  useEffect(() => {
    const cardElement = cardRef.current;
    if (!cardElement) return;

    let scrollTimeout: NodeJS.Timeout | null = null;

    const handleMouseEnter = () => {
      if (isHovering.current) return;
      isHovering.current = true;

      window.dispatchEvent(
        new CustomEvent("cardHover", {
          detail: { type: "leave" },
        })
      );

      setTimeout(() => {
        const rect = cardElement.getBoundingClientRect();
        const scrollX =
          window.pageXOffset || document.documentElement.scrollLeft;
        const scrollY =
          window.pageYOffset || document.documentElement.scrollTop;

        window.dispatchEvent(
          new CustomEvent("cardHover", {
            detail: {
              type: "enter",
              cardId: post.id,
              bounds: {
                left: rect.left + scrollX,
                top: rect.top + scrollY,
                right: rect.right + scrollX,
                bottom: rect.bottom + scrollY,
                width: rect.width,
                height: rect.height,
              },
            },
          })
        );
      }, 10);
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
      window.dispatchEvent(
        new CustomEvent("cardHover", {
          detail: {
            type: "leave",
            cardId: post.id,
          },
        })
      );
    };

    const handleScroll = () => {
      if (!isHovering.current) return;

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        if (!isHovering.current) return;

        const rect = cardElement.getBoundingClientRect();
        const isInViewport =
          rect.top < window.innerHeight &&
          rect.bottom > 0 &&
          rect.left < window.innerWidth &&
          rect.right > 0;

        if (!isInViewport) {
          isHovering.current = false;
          window.dispatchEvent(
            new CustomEvent("cardHover", {
              detail: {
                type: "leave",
                cardId: post.id,
              },
            })
          );
        } else {
          const scrollX =
            window.pageXOffset || document.documentElement.scrollLeft;
          const scrollY =
            window.pageYOffset || document.documentElement.scrollTop;

          window.dispatchEvent(
            new CustomEvent("cardHover", {
              detail: {
                type: "update",
                cardId: post.id,
                bounds: {
                  left: rect.left + scrollX,
                  top: rect.top + scrollY,
                  right: rect.right + scrollX,
                  bottom: rect.bottom + scrollY,
                  width: rect.width,
                  height: rect.height,
                },
              },
            })
          );
        }
      }, 16);
    };

    cardElement.addEventListener("mouseenter", handleMouseEnter);
    cardElement.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      if (isHovering.current) {
        window.dispatchEvent(
          new CustomEvent("cardHover", {
            detail: {
              type: "leave",
              cardId: post.id,
            },
          })
        );
      }
      cardElement.removeEventListener("mouseenter", handleMouseEnter);
      cardElement.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [post.id]);

  return (
    <Card
      ref={cardRef}
      className="w-full overflow-hidden transition-all duration-500 hover:shadow-md dark:hover:shadow-primary/5 hover:scale-[1.005] transform-gpu"
    >
      <Link href={`/post/${post.id}`} className="block">
        {/* A real screenshot when one exists — falls back to a typographic
           cover (the project name) only if a thumbnail is missing. The
           title itself is line-clamped so a long name can never overflow
           its box, on either version of the cover. */}
        {post.thumbnail ? (
          <div
            className={cn(
              "relative w-full bg-muted/60 dark:bg-muted/20 overflow-hidden",
              isCompact ? "h-40" : "h-56 md:h-64"
            )}
          >
            <Image
              src={post.thumbnail.url}
              alt={post.thumbnail.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover object-top"
            />
          </div>
        ) : (
          <div
            className={cn(
              "flex items-center justify-center bg-muted/60 dark:bg-muted/20 px-6 text-center",
              isCompact ? "h-40" : "h-56 md:h-64"
            )}
          >
            <CardTitle className="font-playfair text-2xl md:text-4xl font-bold tracking-tight leading-tight line-clamp-3">
              {post.title}
            </CardTitle>
          </div>
        )}

        <CardContent className="px-4 py-3 md:px-5 md:py-4 flex flex-col">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="space-y-2 flex-1 min-w-0">
              {post.thumbnail && (
                <CardTitle className="text-base md:text-lg font-semibold tracking-tight leading-snug line-clamp-2">
                  {post.title}
                </CardTitle>
              )}
              <div className="flex items-center gap-2 flex-wrap">
                <CategoryBadge category={post.category} />
                {post.projectType && (
                  <Badge variant="outline" className="text-xs">
                    {post.projectType}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                {formattedDate}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="group font-medium flex-shrink-0"
            >
              Read more{" "}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {!isCompact && previewContent && (
            <p className="text-muted-foreground line-clamp-3 leading-relaxed">
              {previewContent}
            </p>
          )}
        </CardContent>
      </Link>
    </Card>
  );
}
