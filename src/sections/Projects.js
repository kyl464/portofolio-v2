"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Star from "@/components/star"; // sama persis seperti di About (huruf kecil)
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects"; // dummy data sementara

export default function Projects() {
  const sectionRef = useRef(null);

  // Reverse-fall untuk dekor bintang (terikat ke section → aman dengan ScrollSmoother)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const spring = { stiffness: 100, damping: 20, restDelta: 0.001 };
  const upSlow = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -120]),
    spring
  );
  const upMed = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -220]),
    spring
  );
  const upFast = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -320]),
    spring
  );

  const featured = projects.filter((p) => p?.featured);
  const regular = projects.filter((p) => !p?.featured);

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading: kanan (zigzag vs About yang kiri) */}
        <div className="flex items-center mb-16">
          <span className="hidden lg:block mr-6 h-[2px] flex-1 rounded-full bg-gradient-to-r from-green-300 via-teal-400 to-green-300 bg-[length:200%_200%] animate-gradient-roam" />
          <h2 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl text-right">
            <span className="text-green-400 mr-4 text-2xl sm:text-3xl">
              02.
            </span>
            Some Things I&apos;ve Built
          </h2>
        </div>

        {/* Featured (ala Brittany) */}
        {featured.length > 0 && (
          <div className="space-y-12">
            {featured.map((p, idx) => (
              <ProjectCard
                key={p.slug || `${p.title}-${idx}`}
                project={p}
                layout="featured"
                reversed={idx % 2 === 1}
              />
            ))}
          </div>
        )}

        {/* Grid untuk sisanya */}
        {regular.length > 0 && (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {regular.map((p, idx) => (
              <ProjectCard key={p.slug || `${p.title}-${idx}`} project={p} />
            ))}
          </div>
        )}

        {/* Empty state ringan */}
        {featured.length === 0 && regular.length === 0 && (
          <p className="mt-6 text-sm text-white/60">
            No projects yet — add items in <code>src/data/projects.js</code>.
          </p>
        )}
      </div>

      {/* Decorative stars (subtle) + reverse-fall scroll */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden md:block"
      >
        <motion.div className="absolute top-6 left-[6%]" style={{ y: upMed }}>
          <Star className="w-5 h-5 text-white/15" />
        </motion.div>
        <motion.div
          className="absolute top-10 right-[10%]"
          style={{ y: upFast }}
        >
          <Star className="w-7 h-7 text-white/12" />
        </motion.div>
        <motion.div
          className="absolute top-1/3 left-[18%]"
          style={{ y: upSlow }}
        >
          <Star className="w-6 h-6 text-[#ffffff1a]" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 right-[22%]"
          style={{ y: upMed }}
        >
          <Star className="w-8 h-8 text-[#174b46]/20" />
        </motion.div>
        <motion.div
          className="absolute bottom-10 left-[12%]"
          style={{ y: upFast }}
        >
          <Star className="w-6 h-6 text-white/10" />
        </motion.div>
        <motion.div
          className="absolute bottom-6 right-[8%]"
          style={{ y: upSlow }}
        >
          <Star className="w-5 h-5 text-white/15" />
        </motion.div>
      </div>
    </section>
  );
}
