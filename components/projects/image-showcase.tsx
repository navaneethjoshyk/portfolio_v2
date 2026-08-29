// A horizontal, auto-scrolling strip of high-fidelity shots pulled from
// every project — a quick visual preview above the project list. Pure CSS
// animation (see .animate-loop-scroll in globals.css), no JS needed.

const SHOWCASE_IMAGES = [
  { url: "/projects/care-calendar/high-fi-1.png", alt: "Care Calendar — high-fidelity screen" },
  { url: "/projects/care-calendar/high-fi-2.png", alt: "Care Calendar — high-fidelity screen" },
  { url: "/projects/infinite-housing/dashboard.png", alt: "Infinite Housing — dashboard" },
  { url: "/projects/infinite-housing/onboarding.png", alt: "Infinite Housing — onboarding" },
  { url: "/projects/infinite-housing/modules.png", alt: "Infinite Housing — learning modules" },
  { url: "/projects/infinite-housing/form.png", alt: "Infinite Housing — certification form" },
  { url: "/projects/med-connect/high-fi-1.jpg", alt: "Med Connect — high-fidelity interface" },
  { url: "/projects/med-connect/high-fi-2.png", alt: "Med Connect — high-fidelity interface" },
  { url: "/projects/ocean-palette/high-fi-1.jpg", alt: "Ocean Palette — high-fidelity interface" },
  { url: "/projects/ocean-palette/high-fi-2.jpg", alt: "Ocean Palette — high-fidelity interface" },
  { url: "/projects/cred/screen.png", alt: "Cred App UI — interface exploration" },
  { url: "/projects/we-united/screen-1.svg", alt: "WeUnited — interface exploration" },
  { url: "/projects/we-united/screen-2.svg", alt: "WeUnited — interface exploration" },
  { url: "/projects/we-united/screen-3.svg", alt: "WeUnited — interface exploration" },
];

export function ProjectsImageShowcase() {
  // Duplicate the list so the strip can loop seamlessly at -50% translate.
  const images = [...SHOWCASE_IMAGES, ...SHOWCASE_IMAGES];

  return (
    <div className="group relative -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden">
      {/* Edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-background to-transparent" />

      <div className="flex w-max flex-nowrap gap-4 sm:gap-6 animate-loop-scroll group-hover:paused">
        {images.map((img, i) => (
          <div
            key={`${img.url}-${i}`}
            className="flex h-40 w-56 sm:h-48 sm:w-72 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-black/10 bg-gray-50 dark:border-white/10 dark:bg-[#161616]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url}
              alt={img.alt}
              className="h-full w-full object-contain p-3"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
