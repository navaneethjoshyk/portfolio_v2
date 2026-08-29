/**
 * Single source of truth for this site's canonical URL and default SEO
 * copy. Everything that needs an absolute URL (metadataBase, sitemap.ts,
 * robots.ts, per-page canonical/OG tags) reads from here, so switching
 * domains later is a one-line change instead of a find-and-replace.
 *
 * IMPORTANT: update SITE_URL to the site's real, final production domain
 * (whatever you set as the primary domain in Netlify) before relying on
 * the sitemap/canonical URLs/Open Graph tags — right now it's a
 * placeholder.
 */
export const SITE_URL = "https://navaneethjoshyk.com";

export const SITE_NAME = "Navaneeth Joshy K — Portfolio";

export const AUTHOR_NAME = "Navaneeth Joshy K";

// Title = who you are.
export const SITE_TITLE = "Navaneeth Joshy K — Portfolio";

// Description = what you do + proof.
export const SITE_DESCRIPTION =
  "Portfolio of Navaneeth Joshy K, a UX/UI Designer and Front-End Developer based in Canada. UI/UX case studies and front-end projects.";
