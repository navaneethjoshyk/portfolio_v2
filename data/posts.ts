// Static project data — hardcoded, no backend / CMS involved.
// Edit this file directly to add, remove, or update projects.

import { Post } from "@/types/post";

export const posts: Post[] = [
  {
    id: "b12feed",
    title: "B12Feed Admin Console",
    slug: "b12feed",
    status: "published",
    featured: true,
    type: "project",
    category: "Food Rescue",
    projectType: "Client work",
    thumbnail: {
      url: "/projects/b12feed/dashboard.png",
      alt: "B12Feed admin dashboard",
    },
    heroImages: [
      { url: "/projects/b12feed/dashboard.png", alt: "B12Feed admin dashboard" },
      { url: "/projects/b12feed/sign-in-default.png", alt: "B12Feed sign-in screen" },
    ],
    excerpt:
      "B12Feed connects surplus food from local businesses with community organizations that redistribute it. I designed and helped build the platform's admin experience — from signing in and recovering an account, to the security and notification settings that keep it trustworthy day to day.",
    createdAt: "2026-01-05T00:00:00.000Z",
    updatedAt: "2026-08-20T00:00:00.000Z",
    viewCount: 0,
    cells: [
      {
        id: "b12feed-1",
        type: "markdown",
        order: 1,
        content: `B12Feed's admin console is used by a small internal team to manage two things that matter a lot to the people relying on the platform: which partner organizations are trusted to receive food, and which food listings are active, flagged, or need attention. Because the console holds account credentials, contact details for real charities, and food-safety-relevant status data, the login and account layer couldn't be an afterthought — it needed to feel as considered as the dashboard itself.

This was a three-person build. I owned the UI/UX design end to end and built the client side in React and Tailwind CSS, working closely with the other two team members on backend logic and admin-side functionality.

- **Role:** UI/UX Design + Frontend
- **Team:** 3-person build
- **Status:** Live product
- **Stack:** React, Tailwind CSS`,
      },
      {
        id: "b12feed-2",
        type: "markdown",
        order: 2,
        content: `## What I Designed & Built

- **Sign-in & recovery flow** — Login with inline validation, a "forgot password" request step, an email-sent confirmation with a resend cooldown, and a guided password-reset screen.
- **Account & security settings** — A settings area split into Account, Security, and Notifications — where admins update their profile, change their password, and control what they're alerted about.
- **Admin workflows** — Organization approvals, a pending-requests queue, and food-listing moderation (flag, resolve, remove) — the day-to-day tools built on top of that trusted account layer.
- **Frontend implementation** — Built the full client side in React and Tailwind CSS, and contributed to admin-side logic alongside the other two team members.`,
      },
      {
        id: "b12feed-3",
        type: "markdown",
        order: 3,
        content: `## Designing the Auth Layer

The sign-in and recovery flow gets the same state coverage as the rest of the product: a default state, inline field-level validation on login, a distinct "check your email" confirmation after a reset request (with a resend cooldown so admins aren't tempted to spam the request), and clear success and error states when setting a new password.

**States covered:** Default, Validation error, Recovery sent, Success`,
      },
      {
        id: "b12feed-4",
        type: "image",
        order: 4,
        content: {
          url: "/projects/b12feed/sign-in-default.png",
          alt: "B12Feed sign-in screen, default state",
        },
      },
      {
        id: "b12feed-5",
        type: "image",
        order: 5,
        content: {
          url: "/projects/b12feed/sign-in-error.png",
          alt: "B12Feed sign-in screen showing invalid email and incorrect password validation",
        },
      },
      {
        id: "b12feed-6",
        type: "image",
        order: 6,
        content: {
          url: "/projects/b12feed/forgot-password.png",
          alt: "B12Feed forgot password request screen",
        },
      },
      {
        id: "b12feed-7",
        type: "image",
        order: 7,
        content: {
          url: "/projects/b12feed/check-your-email.png",
          alt: "B12Feed check your email confirmation with resend cooldown",
        },
      },
      {
        id: "b12feed-8",
        type: "markdown",
        order: 8,
        content: `*Detail worth noting: the reset-sent screen swaps its own "Resend link" button for a disabled state with a live countdown rather than just hiding it — so admins always know a resend is coming rather than wondering if the action was lost.*`,
      },
      {
        id: "b12feed-9",
        type: "image",
        order: 9,
        content: {
          url: "/projects/b12feed/reset-password-default.png",
          alt: "B12Feed create a new password screen, default state",
        },
      },
      {
        id: "b12feed-10",
        type: "image",
        order: 10,
        content: {
          url: "/projects/b12feed/reset-password-error.png",
          alt: "B12Feed create a new password screen showing validation errors",
        },
      },
      {
        id: "b12feed-11",
        type: "markdown",
        order: 11,
        content: `## Account & Security Settings

Once signed in, an admin's Settings page is split into three tabs — Account, Security, and Notifications — so identity details, credentials, and alert preferences aren't competing for space on one long form. Security holds password changes; Notifications lets an admin choose what actually needs their attention (new organization requests, flagged listings, failed pickups, system updates) instead of getting everything by default.`,
      },
      {
        id: "b12feed-12",
        type: "image",
        order: 12,
        content: {
          url: "/projects/b12feed/settings-account.png",
          alt: "B12Feed settings, Account tab with profile and contact details",
        },
      },
      {
        id: "b12feed-13",
        type: "image",
        order: 13,
        content: {
          url: "/projects/b12feed/settings-security.png",
          alt: "B12Feed settings, Security tab with password change fields",
        },
      },
      {
        id: "b12feed-14",
        type: "image",
        order: 14,
        content: {
          url: "/projects/b12feed/settings-notifications.png",
          alt: "B12Feed settings, Notifications tab with selectable alert preferences",
        },
      },
      {
        id: "b12feed-15",
        type: "image",
        order: 15,
        content: {
          url: "/projects/b12feed/password-updated.png",
          alt: "B12Feed password updated confirmation screen",
        },
      },
      {
        id: "b12feed-16",
        type: "markdown",
        order: 16,
        content: `## What That Account Layer Supports

Once an admin is signed in, the console is where B12Feed's actual operation happens: reviewing organizations that want to join the platform, approving or rejecting them, and keeping the food-listings feed clean by flagging, resolving, or removing entries that need attention.`,
      },
      {
        id: "b12feed-17",
        type: "image",
        order: 17,
        content: {
          url: "/projects/b12feed/dashboard.png",
          alt: "B12Feed admin dashboard with platform overview stats and pending requests",
        },
      },
      {
        id: "b12feed-18",
        type: "image",
        order: 18,
        content: {
          url: "/projects/b12feed/organizations.png",
          alt: "B12Feed organizations list with approval and status actions",
        },
      },
      {
        id: "b12feed-19",
        type: "image",
        order: 19,
        content: {
          url: "/projects/b12feed/food-listings.png",
          alt: "B12Feed food listings with status and moderation actions",
        },
      },
      {
        id: "b12feed-20",
        type: "markdown",
        order: 20,
        content: `## Team & My Role

- **Design** — Owned end to end by me: flows, states, and the visual system across the admin console.
- **Frontend** — Client side built by me in React and Tailwind CSS.
- **Backend & admin logic** — Built with the other two members of the team, with my input on admin-side functionality.

## Where It Stands

B12Feed is live and in active use.

- **195** food items routed to partner organizations
- **20** partner organizations onboarded
- **~45%** organization growth this year

*Note on these numbers: these are current platform figures as of this write-up, not a claim about what the login/account redesign specifically caused — they're here to show the product is real and operating, not a concept.*`,
      },
    ],
  },
  {
    id: "mediguru",
    title: "MediGuru \u2014 Telehealth Marketing Site",
    slug: "mediguru",
    status: "published",
    featured: false,
    type: "project",
    category: "Healthcare",
    projectType: "Client work",
    thumbnail: {
      url: "/projects/mediguru/full-page.png",
      alt: "MediGuru marketing site, full page",
    },
    heroImages: [
      { url: "/projects/mediguru/full-page.png", alt: "MediGuru marketing site, full page" },
      { url: "/projects/mediguru/hero.png", alt: "MediGuru hero section" },
    ],
    excerpt:
      "Redesigning the public marketing site for a HIPAA-compliant telehealth platform \u2014 written to persuade the hospitals that buy it, not the patients and doctors who use it.",
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2024-08-01T00:00:00.000Z",
    viewCount: 0,
    cells: [
      {
        id: "mediguru-1",
        type: "markdown",
        order: 1,
        content: `I redesigned the marketing website for MediGuru, a HIPAA-compliant telehealth platform that hospitals buy for their patients and doctors. Video visits, records, and insurance all run through one app, and the website's job was to sell that platform to hospital decision-makers.

- **Role:** Sole UI/UX Designer
- **Scope:** Full landing page redesign
- **Tool:** Figma
- **Status:** Launched
- **Timeline:** Jan 2022 \u2013 Aug 2024 (MediGuru tenure)`,
      },
      {
        id: "mediguru-img-fullpage",
        type: "image",
        order: 2,
        content: {
          url: "/projects/mediguru/full-page.png",
          alt: "MediGuru marketing site, full page from hero to partner logos",
        },
      },
      {
        id: "mediguru-2",
        type: "markdown",
        order: 3,
        content: `## The Brief

The people who use MediGuru are patients and clinicians, but the people who buy it are hospitals. So the website had a different job from the app: persuade an organization that the platform fits its clinical workflow, protects patient data, and works with the systems it already runs.

Patients and doctors meet over video in one place, and everything around the visit runs through the app too: scheduling, forms, chat, records, and insurance. It's HIPAA-compliant end to end and integrates with the hospital's existing EMR. I was the only designer and owned the page from structure through final Figma screens.

The page had to answer three kinds of buyer:

| Buyer | Their question | What they need to hear |
| --- | --- | --- |
| Clinical leads | Will it fit how we work? | It cuts admin work instead of adding to it |
| IT and compliance | Is it safe to plug in? | HIPAA, accreditation, and it talks to our EHR |
| Administrators | Is this worth it? | Who else trusts them, and what it does for patients |`,
      },
      {
        id: "mediguru-3",
        type: "markdown",
        order: 4,
        content: `## Page Structure

A hospital buyer reads the page to answer a set of questions, so I ordered the sections as one continuous case: the problem first, then what the product does, then the proof a cautious buyer needs before booking a demo.

- **Hero** answers "What is this?" \u2014 telemedicine built into your clinical workflow, with one clear action.
- **Radical change** answers "Why now?" \u2014 what patients need and what providers need, side by side.
- **Integration promise** answers "Will it fit?" \u2014 works with your EMR, patient portal, and scheduling.
- **Behavioral health** answers "What gap does it fill?" \u2014 bringing mental health into primary care.
- **Telehealth and workflows** answers "What does it actually do?" \u2014 video visits, transcription, and AI-assisted clinical workflows.
- **IT services** answers "Is it safe and inclusive?" \u2014 accessibility, HIPAA and URAC, HL7 to FHIR.
- **Technology and partners** answers "Can they deliver?" \u2014 a capabilities list and names buyers already know.`,
      },
      {
        id: "mediguru-img-hero",
        type: "image",
        order: 5,
        content: {
          url: "/projects/mediguru/hero.png",
          alt: "MediGuru hero section: Enabling healthcare providers to take that extra step",
        },
      },
      {
        id: "mediguru-img-radical",
        type: "image",
        order: 6,
        content: {
          url: "/projects/mediguru/radical-change.png",
          alt: "MediGuru radical-change section, showing patient needs and provider needs as two equal columns",
        },
      },
      {
        id: "mediguru-img-behavioral",
        type: "image",
        order: 7,
        content: {
          url: "/projects/mediguru/behavioral-health.png",
          alt: "MediGuru behavioral-health section with an 'upto 1%' stat callout",
        },
      },
      {
        id: "mediguru-4a",
        type: "markdown",
        order: 8,
        content: `## Key Design Decisions

### Two audiences, one split screen

The platform only works if it serves both sides of the visit, so the problem statement shows patients and providers as two equal columns with a divider between them. A hospital buyer sees their doctors' frustrations and their patients' frustrations in one view, which sets up the product as the thing that resolves both.

### Navy for trust, green only for action

Healthcare buyers are cautious, so the base palette is a calm clinical navy on light, airy backgrounds. Green has one job: every call to action on the page is green, from "See it in action!" to "Know more." Because nothing else uses that color, the next step always stands out without needing a louder layout.`,
      },
      {
        id: "mediguru-img-telehealth",
        type: "image",
        order: 9,
        content: {
          url: "/projects/mediguru/telehealth-features.png",
          alt: "MediGuru telehealth-features section with flat illustrations and a green call-to-action button",
        },
      },
      {
        id: "mediguru-4b",
        type: "markdown",
        order: 10,
        content: `### Illustrations to make software concrete

"Clinical workflow automation" means very little on its own. I paired each capability with a flat illustration of the moment it matters: a doctor on a video call beside an appointment card, or a team moving through a checklist. The rows alternate left and right so a long page keeps a steady rhythm, and each block stays short enough to scan.

### Put the proof where IT will look for it

For a hospital, compliance can end the conversation before it starts. The services section names HIPAA and URAC directly, explains that the platform can keep the hospital's existing EHR as the system of record, and covers HL7 to FHIR interoperability. Accessibility gets the largest card because it serves both buyer and patient.

The page closes with partner logos \u2014 Redox, Azure, athenahealth, and Microsoft \u2014 so the last thing a buyer sees is names they already trust.`,
      },
      {
        id: "mediguru-5",
        type: "markdown",
        order: 11,
        content: `## Outcome

The redesigned site launched as MediGuru's public face to hospitals. I didn't have access to analytics after launch, so I can't point to numbers here \u2014 that's a gap in how I closed this project out, not a result I'm claiming. Next time I'd agree on success measures with the client before designing, starting with:

- Click-through on "See it in action!" and demo requests from the page
- Scroll depth, to see whether buyers reach the compliance and partner sections
- Clicks on each feature row, to show which capability sells the platform`,
      },
      {
        id: "mediguru-6",
        type: "markdown",
        order: 12,
        content: `## What I'd Do Differently

| Area | Change | Why |
| --- | --- | --- |
| Research | Interview a hospital buyer first | The structure is based on what I believed buyers would ask. A few short interviews with clinical leads or IT managers would have tested that order. |
| Accessibility | Hold the page to the standard it sells | The page promotes an accessibility extension, but some copy is small, light-grey text on a pale background. I'd check every text style against WCAG 2.1 AA and raise the smallest sizes. |
| Content | Source and check every number | The behavioral health stat reads "up to 1%," which works against the argument of that section. A claim like that needs a cited source and a review before launch. |
| Content | Give every card its own message | The HL7 to FHIR card repeats the Security card's confidentiality copy. It should explain what FHIR interoperability means for the hospital's data. |
| Keep | One accent color for action | Reserving green for calls to action worked well on a long page, and I'd carry that rule into future B2B healthcare work. |`,
      },
    ],
  },
  {
    id: "care-calendar",
    title: "Care Calendar",
    slug: "care-calendar",
    status: "published",
    featured: false,
    type: "project",
    category: "Healthcare",
    projectType: "Academic",
    thumbnail: {
      url: "/projects/care-calendar/cover.svg",
      alt: "Care Calendar cover",
    },
    heroImages: [
      { url: "/projects/care-calendar/high-fi-1.png", alt: "Care Calendar high-fidelity screen" },
      { url: "/projects/care-calendar/high-fi-2.png", alt: "Care Calendar high-fidelity screen" },
    ],
    excerpt:
      "A unified healthcare booking platform designed to cut through the navigation complexity and slow performance that plague newcomer-facing scheduling systems.",
    createdAt: "2026-01-15T00:00:00.000Z",
    updatedAt: "2026-04-28T00:00:00.000Z",
    viewCount: 0,
    cells: [
      {
        id: "care-calendar-1",
        type: "markdown",
        order: 1,
        content: `Care Calendar reimagines healthcare booking for newcomers and the family members or caregivers who often manage appointments on their behalf. Existing scheduling platforms were hard to navigate and slow to use; the goal was to turn that fragmented booking experience into a single, high-performance system that keeps a caregiver oriented at every step, even when they're booking care for someone else.

- **Responsibilities:** UI/UX Design, Full-Stack Development
- **Tools:** Figma, React, Tailwind CSS
- **Timeline:** January – April 2026`,
      },
      {
        id: "care-calendar-2",
        type: "markdown",
        order: 2,
        content: `## The Context

Healthcare access is challenging for newcomers, and the booking systems meant to help are often inefficient and complex.

**The gap:** platforms are plagued by difficult navigation and slow performance.
**The objective:** transform booking into a unified, high-performance ecosystem.`,
      },
      {
        id: "care-calendar-3",
        type: "markdown",
        order: 3,
        content: `## How Might We

Of the questions we explored early on, these are the three the shipped design actually addresses:

- **Cognitive load** — display alerts without causing fatigue?
- **Accessibility** — design a UI operable with one hand, for someone juggling a phone and a caregiving task at the same time?
- **Data integrity** — keep appointments in sync in low-connectivity zones?

**Hypothesis:** structured, priority-based alerting reduces fatigue without sacrificing accuracy.`,
      },
      {
        id: "care-calendar-4",
        type: "image",
        order: 4,
        content: {
          url: "/projects/care-calendar/info-architecture.svg",
          alt: "Care Calendar information architecture",
        },
      },
      {
        id: "care-calendar-5",
        type: "markdown",
        order: 5,
        content: `## User Persona — The Caregiver

Booking and tracking care for someone else — a parent, a child, a newcomer family member still learning the healthcare system — is a distinct use case from booking for yourself, and it's who this design centers.

> "I need to know exactly what is next, right now."

**Needs:** task sync, one-handed navigation.
**Pains:** information overload, no offline support.`,
      },
      {
        id: "care-calendar-6",
        type: "image",
        order: 6,
        content: {
          url: "/projects/care-calendar/persona.png",
          alt: "Care Calendar caregiver persona",
        },
      },
      {
        id: "care-calendar-7",
        type: "markdown",
        order: 7,
        content: `## Design Evolution

The interface moved through low, mid, and high-fidelity passes, tightening the visual language and simplifying the booking flow at each stage.`,
      },
      {
        id: "care-calendar-8",
        type: "image",
        order: 8,
        content: {
          url: "/projects/care-calendar/high-fi-1.png",
          alt: "Care Calendar high-fidelity screens",
        },
      },
      {
        id: "care-calendar-9",
        type: "image",
        order: 9,
        content: {
          url: "/projects/care-calendar/high-fi-2.png",
          alt: "Care Calendar high-fidelity screens",
        },
      },
      {
        id: "care-calendar-10",
        type: "markdown",
        order: 10,
        content: `## Evaluation

- **Desirability** — in a small usability test, most participants said the new flow felt calmer and easier to follow than the platforms they'd used before.
- **Feasibility** — the prototype integrates cleanly with a REST API against the existing scheduling backend, so the flow isn't just a visual mockup.
- **Viability** — the reduced manual documentation and structured alerting were designed to cut day-to-day operations overhead; this is a design goal based on the reduction in steps, not a measured result from a live deployment.`,
      },
    ],
  },
  {
    id: "infinite-housing",
    title: "Infinite Housing",
    slug: "infinite-housing",
    status: "published",
    featured: true,
    type: "project",
    category: "Sustainable Construction",
    projectType: "Academic",
    thumbnail: {
      url: "/projects/infinite-housing/cover.png",
      alt: "Infinite Housing cover",
    },
    heroImages: [
      { url: "/projects/infinite-housing/dashboard.png", alt: "Infinite Housing dashboard screen" },
      { url: "/projects/infinite-housing/onboarding.png", alt: "Infinite Housing onboarding screen" },
      { url: "/projects/infinite-housing/modules.png", alt: "Infinite Housing modules screen" },
      { url: "/projects/infinite-housing/material-picker.png", alt: "Infinite Housing material selection screen" },
    ],
    figmaLinks: [
      {
        label: "Open Figma Prototype",
        url: "https://www.figma.com/design/UrnepX8fTurfw4qKFE7aoS/Infinite-housing-Fidelity-?node-id=159-5690",
      },
      {
        label: "View FigJam Board",
        url: "https://www.figma.com/board/U7b80mbWq99kfrfw3Cxen3/Infinite-Homes---Capstone-Project?node-id=0-1",
      },
    ],
    excerpt:
      "A capstone platform that turns sustainable-construction certification into a guided, mobile-first journey for manufacturers, contractors, and first-time builders.",
    createdAt: "2024-05-01T00:00:00.000Z",
    updatedAt: "2024-12-15T00:00:00.000Z",
    viewCount: 0,
    cells: [
      {
        id: "infinite-housing-1",
        type: "markdown",
        order: 1,
        content: `Infinite Housing is a capstone project built around a new category of eco-friendly construction material — one with excellent insulation and thermal mass, but no clear path to market for the people who'd actually use it. The brief: make a credibility-building, mobile-first platform that turns a fragmented, paperwork-heavy certification process into something approachable.

- **Responsibilities:** UI/UX Design, Full-Stack Development
- **Tools:** Figma, React, Tailwind CSS, Node.js, MongoDB
- **Timeline:** May – December 2024 (Conestoga College capstone)`,
      },
      {
        id: "infinite-housing-2",
        type: "markdown",
        order: 2,
        content: `## The Problem

"I want to build sustainably — I just don't know where to start."

Information about the material and its certification process was fragmented, the certification itself was complex, and none of it worked on mobile — even though most of the target audience was in the field, not at a desk.`,
      },
      {
        id: "infinite-housing-3",
        type: "markdown",
        order: 3,
        content: `## How Might We

- Build credibility for a new category of construction material?
- Make eco-materials feel approachable for first-time builders?
- Simplify a complex certification process into clear steps?
- Structure learning modules for varied skill levels?
- Support multiple user types — manufacturers, contractors, and builders?
- Keep users motivated through a multi-module curriculum?`,
      },
      {
        id: "infinite-housing-4",
        type: "image",
        order: 4,
        content: {
          url: "/projects/infinite-housing/onboarding.png",
          alt: "Infinite Housing onboarding flow",
        },
      },
      {
        id: "infinite-housing-5",
        type: "markdown",
        order: 5,
        content: `## Microcopy Decisions

Small wording choices carried a lot of the credibility-building work:

- *"Welcome to Infinite Housing"* → *"Start your journey today"* — positions the action as a meaningful beginning, not just a button click.
- A guided, step-by-step tone throughout, written like a knowledgeable mentor rather than a form.
- A question invites the user in; a statement pushes them away — so onboarding copy leans on questions at every decision point.
- Progress indicators reframe setbacks as forward motion instead of failure.`,
      },
      {
        id: "infinite-housing-6",
        type: "image",
        order: 6,
        content: {
          url: "/projects/infinite-housing/dashboard.png",
          alt: "Infinite Housing dashboard",
        },
      },
      {
        id: "infinite-housing-7",
        type: "image",
        order: 7,
        content: {
          url: "/projects/infinite-housing/modules.png",
          alt: "Infinite Housing learning modules",
        },
      },
      {
        id: "infinite-housing-8",
        type: "image",
        order: 8,
        content: {
          url: "/projects/infinite-housing/form.png",
          alt: "Infinite Housing certification form",
        },
      },
      {
        id: "infinite-housing-9",
        type: "markdown",
        order: 9,
        content: `## Under the Hood

The prototype is a real full-stack build rather than a static mockup: JWT authentication, a MongoDB-backed data layer, and a REST API support a modular licensing flow that scales across multiple user types and material categories.`,
      },
      {
        id: "infinite-housing-10",
        type: "image",
        order: 10,
        content: {
          url: "/projects/infinite-housing/persona.svg",
          alt: "Infinite Housing user persona",
        },
      },
      {
        id: "infinite-housing-11",
        type: "markdown",
        order: 11,
        content: `## Outcome

In testing, the onboarding flow read as clear and approachable for a completely new product category — validating that plain, encouraging copy and a step-by-step structure can do a lot of the trust-building work that a novel material otherwise has to earn on its own.`,
      },
    ],
  },
  {
    id: "med-connect",
    title: "Med Connect",
    slug: "med-connect",
    status: "published",
    featured: true,
    type: "project",
    category: "Healthcare",
    projectType: "Academic",
    thumbnail: {
      url: "/projects/med-connect/cover.png",
      alt: "Med Connect cover",
    },
    heroImages: [
      { url: "/projects/med-connect/high-fi-1.jpg", alt: "Med Connect high-fidelity screen" },
      { url: "/projects/med-connect/high-fi-2.png", alt: "Med Connect high-fidelity screen" },
    ],
    figmaLinks: [
      {
        label: "View Figma Case Study",
        url: "https://www.figma.com/design/0VtyHDyTOltnMRCJTssPnj/Medical?node-id=580-577&t=BjylY3zLe8RCh8p0-1",
      },
    ],
    excerpt:
      "A B2B healthcare platform that unifies scattered patient records and referrals into one secure, real-time view for specialists.",
    createdAt: "2025-09-05T00:00:00.000Z",
    updatedAt: "2025-12-18T00:00:00.000Z",
    viewCount: 0,
    cells: [
      {
        id: "med-connect-1",
        type: "markdown",
        order: 1,
        content: `Med Connect tackles a familiar healthcare problem: information scattered across systems, with no holistic view for the specialists who need it. The goal was to unify records and referrals behind a single, secure interface without burying anyone in medical jargon.

- **Role:** Lead UI/UX, Frontend Architecture
- **Tools:** Figma, Next.js, TypeScript
- **Timeline:** September – December 2025`,
      },
      {
        id: "med-connect-2",
        type: "markdown",
        order: 2,
        content: `## The Problem

Healthcare info is scattered, making a holistic view nearly impossible. The objective was to streamline referrals and provide instant, secure access to unified health metrics — unifying records with real-time communication between providers.`,
      },
      {
        id: "med-connect-3",
        type: "markdown",
        order: 3,
        content: `## How Might We

- Create a seamless handover for specialists?
- Ensure data is secure yet accessible?
- Translate complex medical jargon into visuals?`,
      },
      {
        id: "med-connect-4",
        type: "image",
        order: 4,
        content: {
          url: "/projects/med-connect/high-fi-1.jpg",
          alt: "Med Connect high-fidelity interface",
        },
      },
      {
        id: "med-connect-5",
        type: "markdown",
        order: 5,
        content: `## Usability Testing

The usability round tested the marketing and informational site — navigation, findability, and copy clarity — rather than the referral-handoff workflow itself, which wasn't built out far enough yet to test directly. Five participants ran through a five-task script:

1. **Find the Contact Us page** — all 5 found it quickly with no confusion.
2. A follow-up task surfaced CTA confusion: participants weren't sure where a call-to-action would take them and struggled to navigate back. **Fix:** the destination was redesigned to read as an extension of the same page rather than a separate one.
3. **Navigate to Services and list what's offered** — all 5 found the section and listed the services easily.
4. A comprehension check on the UX writing.
5. An open-ended best/worst impression — participants praised the color palette and clarity of the copy, with the CTA confusion (since addressed) as the only real criticism.`,
      },
      {
        id: "med-connect-6",
        type: "image",
        order: 6,
        content: {
          url: "/projects/med-connect/low-fi-1.jpeg",
          alt: "Med Connect low-fidelity wireframes",
        },
      },
      {
        id: "med-connect-7",
        type: "image",
        order: 7,
        content: {
          url: "/projects/med-connect/high-fi-2.png",
          alt: "Med Connect high-fidelity interface",
        },
      },
      {
        id: "med-connect-8",
        type: "markdown",
        order: 8,
        content: `## Outcome

The redesigned handover flow and clarified CTA turned a scattered set of referral touchpoints into something specialists could move through without hesitation — with the color palette and copy clarity called out specifically in testing.`,
      },
    ],
  },
  {
    id: "ocean-palette",
    title: "Ocean Palette | The Art of the Plate",
    slug: "ocean-palette",
    status: "published",
    featured: false,
    type: "project",
    category: "Hospitality",
    projectType: "Concept",
    thumbnail: {
      url: "/projects/ocean-palette/cover.png",
      alt: "Ocean Palette cover",
    },
    heroImages: [
      { url: "/projects/ocean-palette/high-fi-1.jpg", alt: "Ocean Palette high-fidelity screen" },
      { url: "/projects/ocean-palette/high-fi-2.jpg", alt: "Ocean Palette high-fidelity screen" },
    ],
    excerpt:
      "\"The Art of the Plate\" — a high-aesthetic reservation experience for a fine-dining brand, designed to feel as curated as the menu itself.",
    createdAt: "2026-02-01T00:00:00.000Z",
    updatedAt: "2026-05-10T00:00:00.000Z",
    viewCount: 0,
    cells: [
      {
        id: "ocean-palette-1",
        type: "markdown",
        order: 1,
        content: `Fine dining needed a digital presence that felt as curated as the menu itself. Ocean Palette is a high-aesthetic B2C experience built around that idea — a reservation flow that feels less like a form and more like a concierge service.

- **Role:** UI/UX Designer & Lead Developer
- **Tools:** Next.js, Framer Motion, Tailwind CSS`,
      },
      {
        id: "ocean-palette-2",
        type: "markdown",
        order: 2,
        content: `## The Aesthetic Gap

The objective: create a platform where every interaction feels sophisticated, clean, and effortless — a sensory experience, not just a booking utility.`,
      },
      {
        id: "ocean-palette-3",
        type: "image",
        order: 3,
        content: {
          url: "/projects/ocean-palette/low-fi-1.jpeg",
          alt: "Ocean Palette early exploration",
        },
      },
      {
        id: "ocean-palette-4",
        type: "markdown",
        order: 4,
        content: `## Approach

- **Brand identity & mood** established up front, before any screens were drawn.
- **High-fidelity interface** prioritizing high-resolution imagery without sacrificing load times.
- **Fluid transitions** that mirror the pacing of a multi-course tasting menu, using motion to carry the brand's sense of restraint and polish.
- A **one-click reservation flow** designed to feel like a concierge service rather than a form.`,
      },
      {
        id: "ocean-palette-5",
        type: "image",
        order: 5,
        content: {
          url: "/projects/ocean-palette/high-fi-1.jpg",
          alt: "Ocean Palette high-fidelity interface",
        },
      },
      {
        id: "ocean-palette-6",
        type: "image",
        order: 6,
        content: {
          url: "/projects/ocean-palette/high-fi-2.jpg",
          alt: "Ocean Palette high-fidelity interface",
        },
      },
      {
        id: "ocean-palette-7",
        type: "markdown",
        order: 7,
        content: `## Outcome

- Aesthetic scores increased by 45% in informal design review, moving from the low- to high-fidelity pass.
- Lighthouse performance scores held at 95+ despite the image-heavy design.

*This was a concept project, not a deployed product — the numbers above come from design-review testing, not live user traffic, so I've left out a drop-off figure I couldn't actually measure.*`,
      },
    ],
  },
  {
    id: "cred",
    title: "Cred App UI",
    slug: "cred",
    status: "published",
    featured: false,
    type: "project",
    category: "Fintech",
    projectType: "Concept",
    thumbnail: {
      url: "/projects/cred/cover.svg",
      alt: "Cred app UI cover",
    },
    heroImages: [
      { url: "/projects/cred/cover.svg", alt: "Cred app UI screen" },
      { url: "/projects/cred/screen.png", alt: "Cred app UI screen" },
    ],
    figmaLinks: [
      {
        label: "Explore Prototype",
        url: "https://www.figma.com/design/feH6rXNjjmcBC4XyHDWuVK/cred-UPI?node-id=0-1&t=VrOjZF2o55LGPnQb-1",
      },
    ],
    excerpt:
      "A UI/UX exploration of CRED's fintech experience — building a \"Fort Knox\" aesthetic that makes bill payments feel like a reward instead of a chore.",
    createdAt: "2026-06-01T00:00:00.000Z",
    updatedAt: "2026-06-20T00:00:00.000Z",
    viewCount: 0,
    cells: [
      {
        id: "cred-1",
        type: "markdown",
        order: 1,
        content: `CRED's product sits at an unusual intersection for fintech: it has to look trustworthy enough to hold financial data, yet feel rewarding enough that people open it voluntarily. This project is my own independent UI/UX teardown and redesign exploration of that tension — I have no affiliation with CRED, and none of what follows reflects CRED's actual product roadmap or design decisions.

- **Focus:** Fintech UX Analysis (independent teardown, not a client engagement)
- **Category:** Fintech | UI/UX Design`,
      },
      {
        id: "cred-2",
        type: "markdown",
        order: 2,
        content: `## The Psychology of Fintech

Fintech interfaces usually optimize for utility, not desire. CRED's design language does the opposite — using neumorphic elements and haptic-style interaction cues to trigger a small hit of satisfaction during otherwise mundane flows like bill payments.`,
      },
      {
        id: "cred-3",
        type: "markdown",
        order: 3,
        content: `## How Might We

- Build a "Fort Knox" aesthetic that signals security without feeling cold?
- Make bill payments feel like a reward rather than an obligation?`,
      },
      {
        id: "cred-4",
        type: "image",
        order: 4,
        content: {
          url: "/projects/cred/screen.png",
          alt: "Cred app UI exploration",
        },
      },
      {
        id: "cred-5",
        type: "markdown",
        order: 5,
        content: `## The Design System

The exploration worked through several interface iterations focused on a copper-and-carbon high-fidelity palette — dark, metallic surfaces paired with warm amber accents to keep the "vault" feeling premium rather than sterile, while still guiding attention to the reward moments in each flow.`,
      },
    ],
  },
  {
    id: "we-united",
    title: "WeUnited Matrimony App UI",
    slug: "we-united",
    status: "published",
    featured: false,
    type: "project",
    category: "Matrimony",
    projectType: "Concept",
    thumbnail: {
      url: "/projects/we-united/screen-1.svg",
      alt: "WeUnited app UI cover",
    },
    heroImages: [
      { url: "/projects/we-united/screen-1.svg", alt: "WeUnited app UI screen" },
      { url: "/projects/we-united/screen-2.svg", alt: "WeUnited app UI screen" },
      { url: "/projects/we-united/screen-3.svg", alt: "WeUnited app UI screen" },
    ],
    excerpt:
      "A trust-first matrimony app UI that bridges traditional cultural values with a high-security, values-based matchmaking experience.",
    createdAt: "2026-05-01T00:00:00.000Z",
    updatedAt: "2026-06-05T00:00:00.000Z",
    viewCount: 0,
    cells: [
      {
        id: "we-united-1",
        type: "markdown",
        order: 1,
        content: `WeUnited is a UI/UX case study for a matrimony platform aimed at high-stakes matchmaking — where trust, not swipes, is the product. The challenge was bridging traditional cultural values with a modern, high-security digital interface.

- **Role:** Lead UI/UX Designer & Developer
- **Tools:** Next.js, Tailwind v4, Framer Motion
- **Focus:** High-stakes Matchmaking | UI/UX Design`,
      },
      {
        id: "we-united-2",
        type: "markdown",
        order: 2,
        content: `## The Responsibility

Matrimony platforms carry more responsibility than typical dating products — profile authenticity and safety matter more than engagement metrics. The design hypothesis: ID verification combined with values-based filtering would increase meaningful conversations, by making sure every profile a user sees is verified and genuinely compatible on the things that matter to them.`,
      },
      {
        id: "we-united-3",
        type: "markdown",
        order: 3,
        content: `## Security & Accessibility

High-fidelity refinement focused on making verification feel reassuring rather than bureaucratic, and on keeping the interface accessible across a wide range of ages and technical comfort levels — a deliberate departure from typical dating-app visual language.`,
      },
      {
        id: "we-united-4",
        type: "image",
        order: 4,
        content: {
          url: "/projects/we-united/screen-1.svg",
          alt: "WeUnited interface exploration",
        },
      },
      {
        id: "we-united-5",
        type: "image",
        order: 5,
        content: {
          url: "/projects/we-united/screen-2.svg",
          alt: "WeUnited interface exploration",
        },
      },
      {
        id: "we-united-6",
        type: "image",
        order: 6,
        content: {
          url: "/projects/we-united/screen-3.svg",
          alt: "WeUnited interface exploration",
        },
      },
      {
        id: "we-united-7",
        type: "markdown",
        order: 7,
        content: `## Outcome

The refined flow paired ID-verified registration with values-based filtering and kept performance tight — Lighthouse scores were optimized for speed alongside the added verification steps, so trust-building never came at the cost of a fast, responsive app.`,
      },
    ],
  },
];
