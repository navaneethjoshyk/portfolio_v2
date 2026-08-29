// Post type definitions with labels for UI
export const POST_TYPES = [{ value: "project" as const, label: "Project" }] as const;

// Extract just the type values for TypeScript
export type PostType = (typeof POST_TYPES)[number]["value"];
