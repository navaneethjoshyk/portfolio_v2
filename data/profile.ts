// Single source of truth for the facts on the About page.
//
// The About page renders from this file, and the site's chatbot
// (netlify/functions/chat.mts) answers visitor questions from it too, so
// the two can never disagree. Edit facts here, not in the page.
//
// Keep this file free of "@/..." imports: the Netlify Function bundles it
// directly, outside of Next.js.

export interface ExperienceEntry {
  role: string;
  org: string;
  dates: string;
  summary: string;
}

export interface SkillGroup {
  label: string;
  items: string;
}

export interface EducationEntry {
  school: string;
  location: string;
  detail: string;
}

export const profile = {
  name: "Navaneeth Joshy K",
  headline: "UI/UX Designer and Front-End Developer",
  location: "Brampton, ON (GTA)",
  email: "navaneethjoshyk8@gmail.com",
  links: {
    github: "https://github.com/navaneethjoshyk",
    linkedin: "https://www.linkedin.com/in/navaneethjoshyk/",
    resume: "/resume.pdf",
  },
  openTo: "UI/UX design and front-end development roles",

  // Rendered after "I'm Navaneeth Joshy K, a" on the About page.
  intro:
    "UI/UX Designer and Front-End Developer with 2+ years of experience designing and building digital products end to end — from user research and wireframes to production front-end code — across healthcare, telecom, and non-profit, plus academic and concept work in fintech and housing. I combine UX design with front-end development: design-to-dev handoffs that work, accessibility built in from the start (WCAG 2.1 AA), and a good sense of why something isn't working before I redesign it.",

  // Third-person version of `intro`, used by the chatbot's preset answers.
  // Keep the two saying the same thing.
  summary:
    "Navaneeth is a UI/UX Designer and Front-End Developer with 2+ years of experience designing and building digital products end to end, from user research and wireframes to production front-end code. He has worked across healthcare, telecom, and non-profit, plus academic and concept work in fintech and housing, and builds accessibility in from the start (WCAG 2.1 AA).",

  experience: [
    {
      role: "Graduate Research Assistant",
      org: "Humber College",
      dates: "Jan 2026 – Present",
      summary:
        "Supporting faculty-led research in web technologies and user experience design, using interviews, data analysis, and competitive benchmarking in an academic setting.",
    },
    {
      role: "Graphic Designer (UI/visual design across a 50-screen platform)",
      org: "B12Feed",
      dates: "Jan 2026 – Present",
      summary:
        "Own visual design for the platform: building a clear visual hierarchy and turning wireframes into high-fidelity Figma designs across three separate brand guidelines.",
    },
    {
      role: "Frontend Developer",
      org: "B12Feed",
      dates: "Sept – Dec 2025",
      summary:
        "Built and maintained the platform's responsive React.js components, including the admin console shown in the B12Feed case study.",
    },
    {
      role: "Software & UI/UX Lead",
      org: "OHANA™",
      dates: "Sept 2024 – Sept 2025",
      summary:
        "Led software and UI/UX work for a product team on an enterprise B2B telecom platform, managing a team of 4 developers. Ran design workshops, journey mapping, and usability tests that shaped 12+ design changes, and led UX-strategy and design-system work that improved task completion across 3 core product flows.",
    },
    {
      role: "UI/UX Designer",
      org: "MediGuru",
      dates: "Jan 2022 – Aug 2024",
      summary:
        "Designed complete user experiences across 3 core modules — onboarding, dashboards, and appointment booking — for a regulated healthcare SaaS platform, and built its brand identity guidelines and visual design tokens from scratch, cutting cross-platform design inconsistencies by 60%.",
    },
  ] satisfies ExperienceEntry[],

  skills: [
    { label: "Languages", items: "HTML, CSS, JavaScript, Python" },
    { label: "Frameworks", items: "React, Node.js, Tailwind CSS" },
    {
      label: "Design",
      items:
        "Figma, Adobe XD, Illustrator, Photoshop, Framer, AI-powered design tools",
    },
    {
      label: "Practice",
      items:
        "Wireframing & prototyping, design systems, UX research & usability testing, user journey mapping, user-centred & Lean UX, accessible design, Git",
    },
  ] satisfies SkillGroup[],

  education: [
    {
      school: "Humber College",
      location: "Etobicoke, ON",
      detail: "Postgraduate Certificate, Web Development · May 2025 – May 2026",
    },
    {
      school: "Conestoga College",
      location: "Kitchener, ON",
      detail:
        "Postgraduate Certificate, Game & Interactive Media Design · Interactive Media Management, Design & Visual Communications · May 2024 – Dec 2024",
    },
    {
      school: "Adi Shankara Institute of Engineering & Technology",
      location: "Kalady, India",
      detail: "B.Tech, Computer Science · June 2018 – June 2022",
    },
  ] satisfies EducationEntry[],
};
