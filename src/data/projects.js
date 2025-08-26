// src/data/projects.js
export const projects = [
  {
    title: "BKost - Kost Management App",
    slug: "bkost",
    featured: true,
    description:
      "Manage your kost with ease: tenant tracking, payments, and maintenance.",
    tech: ["NextJS", "ExpressJS", "Styled Components", "Figma", "Vercel"],
    image: {
      src: "",
      alt: "BKost - Kost Management App",
      width: 1200,
      height: 675,
    },
    links: {
      demo: "#",
      repo: "#",
      more: "#",
    },
  },
  {
    title: "Spotify Profile",
    slug: "spotify-profile",
    featured: false,
    description:
      "Personalized dashboard for your Spotify data: top artists, tracks, and recent plays.",
    tech: ["Next.js", "Express", "Spotify API"],
    image: {
      src: "",
      alt: "Spotify profile dashboard mock",
      width: 1200,
      height: 675,
    },
    links: { demo: "#", repo: "#", more: "#" },
  },
  {
    title: "Build a Spotify Connected App",
    slug: "spotify-connected-app",
    featured: false,
    description:
      "OAuth flow + REST API integration walkthrough. Deployable starter for React apps.",
    tech: ["React", "Node", "OAuth 2.0"],
    image: {
      src: "",
      alt: "OAuth tutorial thumbnail",
      width: 1200,
      height: 675,
    },
    links: { demo: "#", repo: "#", more: "#" },
  },
  {
    title: "Minimal Notes",
    slug: "minimal-notes",
    featured: false,
    description:
      "A distraction-free notes app with keyboard-first interactions and local-first sync.",
    tech: ["Next.js", "IndexedDB"],
    image: { src: "", alt: "Minimal Notes", width: 1200, height: 675 },
    links: { demo: "#", repo: "#", more: "#" },
  },
];
