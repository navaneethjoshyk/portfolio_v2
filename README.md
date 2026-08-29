# Navaneeth Joshy K — Portfolio (v2)

Personal portfolio site for [Navaneeth Joshy K](https://www.linkedin.com/in/navaneethjoshyk/) — UX/UI Designer & Front-End Developer, based in Canada.

Live structure: a full-screen animated hero on the home page, and a Projects page with detailed UI/UX case studies. Built with Next.js and Tailwind CSS, with **no backend** — every project is hardcoded as static data, so there's nothing to host, sync, or authenticate against.

## Origin

This site started as a fork of [`isuryanarayanan/supers`](https://github.com/isuryanarayanan/supers) — a personal blog/CMS built on Next.js with an AWS-backed admin panel (DynamoDB, S3, Lambda) for managing posts. That entire backend, admin UI, and multi-content-type system (blog/articles/papers/stories) was stripped out; only the Projects experience, the design system, and the visual shell were kept and re-themed. Project content itself (case studies, images, bio, socials) was carried over from an earlier version of this portfolio at [`navaneethjoshyk/Portfolio`](https://github.com/navaneethjoshyk/Portfolio).

## Tech stack

- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4, shadcn/ui-style components (Radix UI primitives)
- **3D / effects:** Three.js + `@react-three/fiber` for the animated matrix-shader hero background
- **Content rendering:** `markdown-to-jsx` for case-study body text, with custom renderers for code blocks, callouts, tables, and images
- **Analytics:** Google Analytics 4 (`gtag.js`), same property used on the previous portfolio
- **Package manager:** pnpm

There is no database, no API routes, and no authentication — the site is fully static and exports as plain HTML/CSS/JS (`next build` with `output: "export"`).

## Project structure

```
app/
  page.tsx                    # Home page — animated hero, name/title/skills, social links
  layout.tsx                  # Root layout — fonts, theming, header/footer, GA4 scripts
  (pages)/
    projects/page.tsx         # Projects grid — lists all published "project" posts
    post/[id]/page.tsx        # Project detail page — renders a post's cells
    info/page.tsx             # About page — bio, experience, education, socials
components/
  layout/                     # Header, footer, desktop/mobile nav
  post/                       # Project card + cell renderers (markdown, image, video, file)
  ui/                         # Design-system primitives (buttons, cards, dialogs, the shader background, etc.)
data/
  posts.ts                    # ⭐ All project content lives here — see "Editing content" below
public/
  projects/<slug>/            # Screenshots and cover images, one folder per project
lib/
  posts-api.ts                # Static content post-processing (unescaping markdown/cell content)
  constants.ts                # Post type definitions
types/
  post.ts                     # Post/Cell/ImageContent/VideoContent/FileContent types
```

## Editing content

Everything about a project lives in **`data/posts.ts`** — there is no CMS or admin UI to log into.

Each entry in the `posts` array is an object like:

```ts
{
  id: "my-project",
  title: "My Project",
  slug: "my-project",
  status: "published",       // "draft" posts are hidden from the site
  featured: false,
  type: "project",
  thumbnail: { url: "/projects/my-project/cover.png", alt: "..." },
  excerpt: "One or two sentences shown on the project card.",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-02-01T00:00:00.000Z",
  viewCount: 0,
  cells: [
    { id: "my-project-1", type: "markdown", order: 1, content: "## A section\n\nBody text..." },
    { id: "my-project-2", type: "image", order: 2, content: { url: "/projects/my-project/shot.png", alt: "..." } },
  ],
}
```

To add or update a project:

1. Drop images into `public/projects/<slug>/` (create the folder if it doesn't exist).
2. Copy an existing project object in `data/posts.ts` as a template, or edit one in place.
3. Reference images with a root-relative path, e.g. `/projects/<slug>/cover.png`.
4. `cells` controls the content on the project's detail page (`/post/<id>`) top to bottom. Supported cell types: `markdown` (rendered with headings, lists, bold, blockquotes, etc.) and `image`.

Images are rendered at their natural aspect ratio (no forced cropping) — the thumbnail on the project card and the images inside a case study both use `object-contain`, so portrait screenshots, wide screenshots, and square logos all display in full rather than getting cut off.

To change the home page's name/title/skills or the About page bio, edit `app/page.tsx` and `app/(pages)/info/page.tsx` directly.

## Development

```bash
pnpm install
pnpm dev       # http://localhost:3000
pnpm build     # static export → out/ (see next.config.ts)
pnpm start     # serve a production build
pnpm lint
```

## Analytics

Google Analytics 4 is wired up in `app/layout.tsx` via `next/script`, using the measurement ID `G-GK5VL27KZM` (the same property tracked the previous version of this portfolio, so history carries over). To point it at a different property, change `GA_MEASUREMENT_ID` in that file.

## Deployment

`next.config.ts` enables static export (`output: "export"`) only for production builds, so `pnpm build` produces a fully static `out/` directory that can be hosted on any static host (GitHub Pages, Netlify, Vercel, S3, etc.) with no server required.
