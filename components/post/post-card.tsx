"use client";

import { Post } from "@/types/post";
import { ProjectPostCard } from "./project-post-card";

interface PostCardProps {
  post: Post;
  variant?: "default" | "compact";
}

export function PostCard({ post, variant = "default" }: PostCardProps) {
  return <ProjectPostCard post={post} variant={variant} />;
}
