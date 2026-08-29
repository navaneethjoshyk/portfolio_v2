"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const pathname = usePathname();

  // The home page already has its own social links over the hero, so the
  // footer would just duplicate them — skip it there.
  if (pathname === "/") {
    return null;
  }

  return (
    <footer className="relative z-10 mt-auto">
      <div className="relative container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Social Media Section */}
          <div className="space-y-2">
            <h3 className="font-bold text-xl tracking-tight">Connect</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="outline" size="icon" asChild>
                <Link
                  href="https://github.com/navaneethjoshyk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link
                  href="https://www.linkedin.com/in/navaneethjoshyk/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link href="mailto:navaneethjoshyk8@gmail.com">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="text-center text-sm text-muted-foreground font-medium">
          © {new Date().getFullYear()} Navaneeth Joshy K
        </div>
      </div>
    </footer>
  );
}
