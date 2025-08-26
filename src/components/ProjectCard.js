"use client";

import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

export default function ProjectCard({ project, layout = "regular", reversed }) {
  const {
    title,
    description,
    tech = [],
    image = {},
    links = {},
    featured,
  } = project || {};
  const hasImage = image?.src;

  if (layout === "featured") {
    return (
      <section className="relative grid lg:grid-cols-12 gap-6 py-12">
        {/* Text panel */}
        <div
          className={`lg:col-span-6 ${
            reversed ? "lg:col-start-7" : "lg:col-start-1"
          } flex flex-col justify-center z-10`}
        >
          <p className="text-green-400 text-sm font-semibold mb-2">
            Featured Project
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-100">
            {title}
          </h3>
          <div className="mt-4 bg-[#0c1412]/80 border border-white/5 rounded-lg p-5 text-gray-300 backdrop-blur">
            {description}
          </div>

          {/* Tech */}
          <ul className="mt-4 flex flex-wrap gap-3 text-sm text-gray-400">
            {tech.map((t) => (
              <li key={t} className="px-3 py-1 rounded-full bg-white/5">
                {t}
              </li>
            ))}
          </ul>

          {/* Links */}
          <div className="mt-5 flex items-center gap-4 text-sm">
            {links.repo && (
              <a
                className="hover:text-green-300"
                href={links.repo}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Repository"
                title="GitHub"
              >
                <FaGithub className="text-xl" />
              </a>
            )}
            {links.demo && (
              <a
                className="hover:text-green-300"
                href={links.demo}
                target="_blank"
                rel="noreferrer"
                aria-label="Live Demo"
                title="Live Demo"
              >
                <FiExternalLink className="text-xl" />
              </a>
            )}
            {links.more && (
              <a
                className="ml-auto border border-white/10 rounded-md px-3 py-1 hover:bg-white/5"
                href={links.more}
                target="_blank"
                rel="noreferrer"
              >
                Learn More
              </a>
            )}
          </div>
        </div>

        {/* Image */}
        <div
          className={`lg:col-span-6 ${
            reversed ? "lg:col-start-1" : "lg:col-start-7"
          } relative min-h-[260px] lg:min-h-[320px]`}
        >
          <div className="absolute inset-0 rounded-lg overflow-hidden ring-1 ring-white/10 bg-white/5">
            {hasImage ? (
              <Image
                src={image.src}
                alt={image.alt || title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority={featured}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#1b2a27] via-[#12332e] to-[#0b201d]" />
            )}
          </div>
        </div>
      </section>
    );
  }


  return (
    <article className="group relative rounded-xl overflow-hidden ring-1 ring-white/10 bg-white/5">
      <div className="relative aspect-[16/9]">
        {hasImage ? (
          <Image
            src={image.src}
            alt={image.alt || title}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#162623] via-[#0e1f1c] to-[#0a1816]" />
        )}
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-100">{title}</h3>
        <p className="mt-2 text-gray-300 text-sm">{description}</p>

        <ul className="mt-4 flex flex-wrap gap-2 text-xs text-gray-400">
          {tech.map((t) => (
            <li key={t} className="px-2 py-1 rounded-full bg-white/5">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center gap-4 text-sm">
          {links.repo && (
            <a
              className="hover:text-green-300"
              href={links.repo}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Repository"
              title="GitHub"
            >
              <FaGithub className="text-xl" />
            </a>
          )}
          {links.demo && (
            <a
              className="hover:text-green-300"
              href={links.demo}
              target="_blank"
              rel="noreferrer"
              aria-label="Live Demo"
              title="Live Demo"
            >
              <FiExternalLink className="text-xl" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
