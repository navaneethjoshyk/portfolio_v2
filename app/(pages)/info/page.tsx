import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { AUTHOR_NAME } from "@/lib/site-config";

const TITLE = "About";
const DESCRIPTION = `About ${AUTHOR_NAME}, a UI/UX Designer and Front-End Developer based in Canada with 2+ years of experience across healthcare, fintech, housing, media, and enterprise web.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/info",
  },
  openGraph: {
    type: "profile",
    url: "/info",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="grid gap-12">
          <div className="space-y-8">
            <section>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
                About
              </h1>

              <div className="space-y-8">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-lg leading-relaxed text-foreground">
                    I&apos;m <strong>Navaneeth Joshy K</strong>, a UI/UX
                    Designer and Front-End Developer with 2+ years of
                    experience designing and building digital products end to
                    end — from user research and wireframes to production
                    front-end code — across five industries: healthcare,
                    fintech, housing, media, and enterprise web. I combine UX
                    design with front-end development: design-to-dev
                    handoffs that work, accessibility built in from the start
                    (WCAG 2.1 AA), and a good sense of why something
                    isn&apos;t working before I redesign it.
                  </p>

                  <h3 className="text-xl font-semibold mt-8 mb-3 tracking-tight">
                    Experience highlights
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>
                        Graduate Research Assistant, Humber College
                      </strong>{" "}
                      (Jan 2026 – Present) — Supporting faculty-led research
                      in web technologies and user experience design, using
                      interviews, data analysis, and competitive benchmarking
                      in an academic setting.
                    </li>
                    <li>
                      <strong>Graphic Designer, B12Feed</strong> (Jan 2026 –
                      Present) — Own visual design for a 50-screen platform:
                      building a clear visual hierarchy and turning
                      wireframes into high-fidelity Figma designs across
                      three separate brand guidelines.
                    </li>
                    <li>
                      <strong>Frontend Developer, B12Feed</strong> (Sept – Dec
                      2025) — Built and maintained the platform&apos;s
                      responsive React.js components, including the admin
                      console shown in the case study below.
                    </li>
                    <li>
                      <strong>Software &amp; UI/UX Lead, OHANA™</strong>{" "}
                      (Sept 2024 – Sept 2025) — Led software and UI/UX work
                      for a product team on an enterprise B2B telecom
                      platform, managing a team of 4 developers. Ran design
                      workshops, journey mapping, and usability tests that
                      shaped 12+ design changes, and led UX-strategy and
                      design-system work that improved task completion across
                      3 core product flows by an estimated 18%.
                    </li>
                    <li>
                      <strong>UI/UX Designer, MediGuru</strong> (Jan 2022 –
                      Aug 2024) — Designed complete user experiences across 3
                      core modules — onboarding, dashboards, and appointment
                      booking — for a regulated healthcare SaaS platform, and
                      built its brand identity guidelines and visual design
                      tokens from scratch, cutting cross-platform design
                      inconsistencies by 60%.
                    </li>
                  </ul>

                  <h3 className="text-xl font-semibold mt-8 mb-3 tracking-tight">
                    Technical Expertise
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Languages</strong>: HTML, CSS, JavaScript, Python
                    </li>
                    <li>
                      <strong>Frameworks</strong>: React, Node.js, Tailwind
                      CSS
                    </li>
                    <li>
                      <strong>Design</strong>: Figma, Adobe XD, Illustrator,
                      Photoshop, Framer, AI-powered design tools
                    </li>
                    <li>
                      <strong>Practice</strong>: Wireframing & prototyping,
                      design systems, UX research & usability testing, user
                      journey mapping, user-centred & Lean UX, accessible
                      design, Git
                    </li>
                  </ul>

                  <h3 className="text-xl font-semibold mt-8 mb-3 tracking-tight">
                    Education
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p>
                        <strong>Humber College</strong>, Etobicoke, ON
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Postgraduate Certificate, Web Development · May 2025 –
                        May 2026
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Conestoga College</strong>, Kitchener, ON
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Postgraduate Certificate, Game &amp; Interactive Media
                        Design · Interactive Media Management, Design &amp;
                        Visual Communications · May 2024 – Dec 2024
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>
                          Adi Shankara Institute of Engineering &amp;
                          Technology
                        </strong>
                        , Kalady, India
                      </p>
                      <p className="text-sm text-muted-foreground">
                        B.Tech, Computer Science · June 2018 – June 2022
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-semibold tracking-tight">
                    Connect
                  </h3>
                  <div className="space-y-4">
                    <p className="text-base text-muted-foreground max-w-prose">
                      Open to UI/UX design and front-end development roles —
                      the fastest way to reach me is email, or take a look at
                      the full breakdown of my experience in my resume.
                    </p>
                    <div className="flex gap-3 flex-wrap">
                      <Button asChild className="font-medium">
                        <Link href="mailto:navaneethjoshyk8@gmail.com">
                          Email me
                        </Link>
                      </Button>
                      <Button variant="outline" asChild className="font-medium">
                        <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                          Download Resume
                        </Link>
                      </Button>
                      <Button variant="outline" asChild className="font-medium">
                        <Link
                          href="https://github.com/navaneethjoshyk"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          GitHub
                        </Link>
                      </Button>
                      <Button variant="outline" asChild className="font-medium">
                        <Link
                          href="https://www.linkedin.com/in/navaneethjoshyk/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          LinkedIn
                        </Link>
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      📍 Based in Ontario, Canada
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
