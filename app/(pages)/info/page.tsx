import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { AUTHOR_NAME } from "@/lib/site-config";
import { profile } from "@/data/profile";

const TITLE = "About";
const DESCRIPTION = `About ${AUTHOR_NAME}, a UI/UX Designer and Front-End Developer based in Canada with 2+ years of experience across healthcare, telecom, and non-profit, plus academic and concept work in fintech and housing.`;

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
                    I&apos;m <strong>{profile.name}</strong>, a {profile.intro}
                  </p>

                  <h3 className="text-xl font-semibold mt-8 mb-3 tracking-tight">
                    Experience highlights
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {profile.experience.map((job) => (
                      <li key={`${job.org}-${job.role}`}>
                        <strong>
                          {job.role}, {job.org}
                        </strong>{" "}
                        ({job.dates}) — {job.summary}
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-semibold mt-8 mb-3 tracking-tight">
                    Technical Expertise
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {profile.skills.map((group) => (
                      <li key={group.label}>
                        <strong>{group.label}</strong>: {group.items}
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-semibold mt-8 mb-3 tracking-tight">
                    Education
                  </h3>
                  <div className="space-y-4">
                    {profile.education.map((edu) => (
                      <div key={edu.school}>
                        <p>
                          <strong>{edu.school}</strong>, {edu.location}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {edu.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-semibold tracking-tight">
                    Connect
                  </h3>
                  <div className="space-y-4">
                    <p className="text-base text-muted-foreground max-w-prose">
                      Open to {profile.openTo} —
                      the fastest way to reach me is email, or take a look at
                      the full breakdown of my experience in my resume.
                    </p>
                    <div className="flex gap-3 flex-wrap">
                      <Button asChild className="font-medium">
                        <Link href={`mailto:${profile.email}`}>
                          Email me
                        </Link>
                      </Button>
                      <Button variant="outline" asChild className="font-medium">
                        <Link href={profile.links.resume} target="_blank" rel="noopener noreferrer">
                          Download Resume
                        </Link>
                      </Button>
                      <Button variant="outline" asChild className="font-medium">
                        <Link
                          href={profile.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          GitHub
                        </Link>
                      </Button>
                      <Button variant="outline" asChild className="font-medium">
                        <Link
                          href={profile.links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          LinkedIn
                        </Link>
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      📍 {profile.location}
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
