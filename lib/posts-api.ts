import { Post, Cell } from "@/types/post";

/**
 * Helper for working with statically-defined posts (see data/posts.ts).
 * The site has no backend — all post content is hardcoded — so this only
 * contains the content-normalization logic that used to also run against
 * API responses (unescaping markdown, unwrapping doubly-JSON-encoded cell
 * content, etc).
 */
export class PostsApi {
  static processStaticPosts(posts: Post[]): Post[] {
    return posts.map((post) => {
      if (!post || !post.cells) return post;

      return {
        ...post,
        cells: post.cells.map((cell: Cell) => {
          if (cell.type === "markdown" && typeof cell.content === "string") {
            let content = cell.content;

            // Remove outer quotes if they exist (double JSON encoding issue)
            if (content.startsWith('"') && content.endsWith('"')) {
              content = content.slice(1, -1);
            }

            // Convert escaped characters back to actual characters
            content = content
              .replace(/\\n/g, "\n")
              .replace(/\\t/g, "\t")
              .replace(/\\"/g, '"');

            return {
              ...cell,
              content,
            };
          } else if (
            (cell.type === "image" ||
              cell.type === "video" ||
              cell.type === "file") &&
            typeof cell.content === "string"
          ) {
            let content: unknown = cell.content;

            try {
              while (typeof content === "string") {
                try {
                  const parsed = JSON.parse(content);
                  if (typeof parsed === "string" && parsed !== content) {
                    content = parsed;
                  } else {
                    content = parsed;
                    break;
                  }
                } catch {
                  break;
                }
              }

              return {
                ...cell,
                content: content as Cell["content"],
              };
            } catch (error) {
              console.error("Failed to process static cell content:", error);
              return cell;
            }
          }
          return cell;
        }),
      };
    });
  }
}

export default PostsApi;
