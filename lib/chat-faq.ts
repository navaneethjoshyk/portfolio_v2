// Preset questions for the homepage chat, with answers generated from the
// site's own data (data/profile.ts, and the projects featured on the
// homepage), so they update automatically when that content changes and
// never say anything the site doesn't.
//
// Built at build time in app/page.tsx and passed to the chat widget, so the
// answers ship as plain text instead of bundling the data into client JS.

import { profile } from "../data/profile";
import type { Post } from "../types/post";

export interface FaqItem {
  id: string;
  question: string;
  /** Markdown. Links are limited to what the chat widget allows. */
  answer: string;
}

type FeaturedProject = Pick<Post, "id" | "title" | "projectType" | "category">;

const firstName = profile.name.split(" ")[0];
const bareUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export function buildFaq(featured: FeaturedProject[]): FaqItem[] {
  const experience = profile.experience
    .map((job) => `- **${job.role}**, ${job.org} (${job.dates})`)
    .join("\n");

  const skills = profile.skills
    .map((group) => `- **${group.label}:** ${group.items}`)
    .join("\n");

  const projects = featured
    .map((post) => {
      const meta = [post.projectType, post.category].filter(Boolean).join(" · ");
      return `- [${post.title}](/post/${post.id}/)${meta ? `: ${meta}` : ""}`;
    })
    .join("\n");

  const education = profile.education
    .map((edu) => `- **${edu.school}:** ${edu.detail}`)
    .join("\n");

  return [
    {
      id: "who",
      question: `Who is ${firstName}?`,
      answer: `${profile.summary}\n\nThe [About page](/info/) has the full picture.`,
    },
    {
      id: "experience",
      question: "What's his experience?",
      answer: `His recent roles:\n\n${experience}\n\nThe [About page](/info/) describes what he did in each one.`,
    },
    {
      id: "skills",
      question: "What tools and skills does he have?",
      answer: `${skills}`,
    },
    {
      id: "projects",
      question: "Which projects should I look at?",
      answer: `Good places to start:\n\n${projects}\n\nOr browse [all projects](/projects/).`,
    },
    {
      id: "accessibility",
      question: "Does he design for accessibility?",
      answer: `Yes. He builds accessibility in from the start and designs to WCAG 2.1 AA. On B12Feed, he ran the original gray text and button colors through a contrast checker, found several pairings failed, and reworked the palette before launch. The [B12Feed case study](/post/b12feed/) covers it.`,
    },
    {
      id: "education",
      question: "What's his education?",
      answer: `${education}`,
    },
    {
      id: "roles",
      question: "Is he open to new roles?",
      answer: `Yes. He's open to ${profile.openTo} and is based in ${profile.location}. You can [download his resume](${profile.links.resume}) or [email him](mailto:${profile.email}).`,
    },
    {
      id: "contact",
      question: "How can I contact him?",
      answer: [
        `- **Email:** [${profile.email}](mailto:${profile.email})`,
        `- **LinkedIn:** [${bareUrl(profile.links.linkedin)}](${profile.links.linkedin})`,
        `- **GitHub:** [${bareUrl(profile.links.github)}](${profile.links.github})`,
        `- **Resume:** [PDF](${profile.links.resume})`,
      ].join("\n"),
    },
  ];
}
