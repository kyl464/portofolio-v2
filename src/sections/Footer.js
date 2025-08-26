"use client";

import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24">
      {/* hairline gradient tipis di atas footer */}
      <div className="absolute -top-px inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-400/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center gap-5 text-center">
          {/* socials */}
          <div className="flex items-center gap-5 text-white/70">
            <a
              href="https://github.com/kyl464"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hover:text-green-300 transition"
              title="GitHub"
            >
              <FaGithub className="text-xl" />
            </a>
            <a
              href="mailto:hello@example.com"
              className="hover:text-green-300 transition"
              aria-label="Email"
              title="Email"
            >
              <FaEnvelope className="text-xl" />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-green-300 transition"
              title="LinkedIn"
            >
              <FaLinkedin className="text-xl" />
            </a>
          </div>

          {/* meta */}
          <p className="text-sm text-white/50">
            © {year} • Built with Next.js, Tailwind & a sprinkle of motion
          </p>

          {/* back to top */}
          <a
            href="#home"
            className="mt-1 inline-flex items-center gap-2 text-xs tracking-wide text-white/70 hover:text-green-300 transition"
          >
            Back to top
            <span
              aria-hidden
              className="inline-block h-[1px] w-8 bg-gradient-to-r from-green-300/60 to-teal-400/60"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
