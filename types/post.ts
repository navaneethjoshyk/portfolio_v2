import { PostType } from "@/lib/constants";

export interface Post {
  title: string;
  slug?: string;
  cells: Cell[];
  thumbnail?: ImageContent;
  /** High-fidelity screenshots used as the project card's scrolling hero
   * image. Falls back to `thumbnail` when absent or empty. */
  heroImages?: ImageContent[];
  /** Links to the project's Figma file(s) — prototype, design system,
   * FigJam board, etc. Rendered as buttons at the end of the case study. */
  figmaLinks?: { label: string; url: string }[];
  /** Industry/category label shown as an icon + badge on the project
   * card (e.g. "Healthcare", "Fintech"). See components/post/category-badge.tsx
   * for the icon/color lookup — unmapped labels fall back to a generic style. */
  category?: string;
  status: "published" | "draft";
  featured: boolean;
  type: PostType;
  id: string;
  createdAt: string;
  updatedAt: string;
  excerpt?: string;
  viewCount?: number;
}

export interface Cell {
  id: string;
  type: "markdown" | "image" | "video" | "file";
  content: string | ImageContent | VideoContent | FileContent;
  order?: number;
}

export interface ImageContent {
  url: string;
  alt: string;
}

export interface VideoContent {
  url: string;
  title: string;
  provider?: "youtube" | "vimeo" | "direct";
}

export interface FileContent {
  s3Url: string;
  displayType?: "inline" | "attachment" | "gallery";
  caption?: string;
  fileType?: "image" | "video" | "audio" | "document";
  originalName?: string;
  size?: number;
}
