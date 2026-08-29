import { Button } from "@/components/ui/button";
import Link from "next/link";

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
                    I&apos;m <strong>Navaneeth Joshy K</strong>, a UX/UI
                    Designer and Front-End Developer based in Canada with over
                    two years of experience across telecom, healthcare, and
                    non-profit sectors. I combine interaction design expertise
                    with full-stack development to bridge the gap between
                    complex user needs and high-performance technical
                    solutions — from Figma prototyping and design systems to
                    responsive, production front-ends.
                  </p>

                  <h3 className="text-xl font-semibold mt-8 mb-3 tracking-tight">
                    Experience highlights
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>B12Feed (2026—Present)</strong> — Front-End
                      Developer designing user-facing workflows and interface
                      components for a community resource-sharing platform.
                      Created user journey documentation and an MVP-to-Phase-2
                      product roadmap, collaborated closely with developers to
                      keep design intent intact through implementation, and
                      leveraged AI-assisted tooling (GitHub Copilot, Claude)
                      to speed up development without compromising code
                      quality.
                    </li>
                    <li>
                      <strong>OHANA™ (2024—2025)</strong> — UI/UX Designer
                      (Contract) redesigning key website pages for a
                      fast-growing telecom platform. Built fully responsive,
                      mobile-first layouts, produced wireframes and
                      high-fidelity prototypes in Figma, and ran usability
                      evaluations with structured, actionable reports.
                    </li>
                    <li>
                      <strong>MediGuru, Chennai (2022—2023)</strong> — UI/UX
                      Designer who designed and launched the company&apos;s
                      main website, conducted user research and usability
                      testing, and maintained UI style guides to keep the
                      product consistent as it grew.
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
                  <div className="space-y-3">
                    <p>
                      <strong>
                        Humber Polytechnic &amp; Conestoga College
                      </strong>
                      <br />
                      2018 – 2026
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Web Development at Humber Polytechnic, with a focus on
                      front-end integration and design-to-development
                      workflows, plus a Graduate Certificate in Interactive
                      Media Management — Interaction Design from Conestoga
                      College. Background includes a Bachelor of Computer
                      Science & Engineering, with a foundation in data
                      structures, algorithms, and systems design.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-semibold tracking-tight">
                    Connect
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-3 flex-wrap">
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
                      <Button variant="outline" asChild className="font-medium">
                        <Link href="mailto:navaneethjoshyk8@gmail.com">
                          Email
                        </Link>
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      📍 Based in Canada
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
