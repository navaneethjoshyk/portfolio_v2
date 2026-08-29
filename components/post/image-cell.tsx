"use client";

interface ImageCellProps {
  content: {
    url: string;
    alt: string;
  };
}

export function ImageCell({ content }: ImageCellProps) {
  // Don't render if URL is empty or invalid
  if (!content?.url || content.url.trim() === "") {
    return null;
  }

  return (
    <div className="w-full flex justify-center overflow-hidden rounded-lg bg-muted/30">
      {/* Rendered at natural aspect ratio (no forced crop) so portrait
         screenshots, wide screenshots, and logos all display in full;
         height is capped so very tall images don't dominate the page. */}
      <img
        src={content.url}
        alt={content.alt || ""}
        className="w-auto h-auto max-w-full max-h-[70vh] object-contain"
        loading="lazy"
      />
    </div>
  );
}
