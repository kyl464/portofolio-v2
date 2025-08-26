"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Robust import: dukung named `experiences` atau default export array
import * as expModule from "@/data/experience";
const RAW = Array.isArray(expModule.experiences)
  ? expModule.experiences
  : Array.isArray(expModule.default)
  ? expModule.default
  : [];

// Urutan data (default: terbaru -> terlama)
const ORDER = "desc";
const toYear = (v) => (v === "Present" ? 9999 : parseInt(v, 10) || 0);
const sortExp = (a, b) =>
  ORDER === "desc"
    ? toYear(b.end) - toYear(a.end) || toYear(b.start) - toYear(a.start)
    : toYear(a.end) - toYear(b.end) || toYear(a.start) - toYear(b.start);

import Star from "@/components/star"; // sama seperti About (huruf kecil)

function Item({ exp, align = "left", active, setRef }) {
  return (
    <div ref={setRef} className="relative grid md:grid-cols-12 gap-8 md:gap-12">
      <div
        className={`${
          align === "left"
            ? "md:col-span-6 md:pr-8"
            : "md:col-span-6 md:col-start-7 md:pl-8"
        } transition-all duration-300 rounded-xl p-5 backdrop-blur-sm ring-1 bg-white/5 ${
          active
            ? "ring-green-300/60 shadow-[0_0_0_1px_rgba(110,231,183,.18),0_0_24px_rgba(110,231,183,.35)]"
            : "ring-white/10"
        }`}
      >
        <div className="flex flex-wrap items-center gap-x-3 text-sm text-green-300">
          <span className="font-semibold">
            {exp.start} — {exp.end}
          </span>
          <span className="text-white/40">•</span>
          <a
            href={exp.url}
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-200"
          >
            {exp.company}
          </a>
          <span className="text-white/40">•</span>
          <span className="text-white/60">{exp.location}</span>
        </div>

        <h3 className="mt-2 text-xl font-semibold text-gray-100">{exp.role}</h3>
        <p className="mt-2 text-gray-300">{exp.summary}</p>

        {exp.highlights?.length > 0 && (
          <ul className="mt-4 space-y-2 text-sm text-gray-300 list-disc pl-5">
            {exp.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        )}

        {exp.tech?.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2 text-xs text-gray-400">
            {exp.tech.map((t) => (
              <li key={t} className="px-2 py-1 rounded-full bg-white/5">
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef(null);

  // Progress garis & dot berdasarkan section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end start"],
  });

  const fillY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // DOT bergerak 0% -> 100% tinggi section (absolute: aman dgn ScrollSmoother)
  const dotY = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
    { stiffness: 120, damping: 18 }
  );

  // ===== Reverse-fall stars (parallax ke atas, terikat ke section) =====
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

  // Highlight kartu terdekat ke dot
  const [activeIdx, setActiveIdx] = useState(0);
  const itemRefs = useRef([]);
  const setItemRef = (el, i) => (itemRefs.current[i] = el);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (p) => {
      const sec = sectionRef.current?.getBoundingClientRect();
      if (!sec) return;
      const dotAbs = sec.top + p * sec.height; // posisi absolut dot (px)

      let nearest = 0;
      let best = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const d = Math.abs(center - dotAbs);
        if (d < best) {
          best = d;
          nearest = i;
        }
      });
      setActiveIdx(nearest);
    });
    return () => unsub();
  }, [scrollYProgress]);

  const items = useMemo(() => [...RAW].sort(sortExp), []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading kiri (03.) */}
        <h2 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl flex items-center mb-16">
          <span className="text-green-400 mr-4 text-2xl sm:text-3xl">03.</span>
          Experience
          <span className="hidden lg:block ml-6 h-[2px] flex-1 rounded-full bg-gradient-to-r from-green-300 via-teal-400 to-green-300 bg-[length:200%_200%] animate-gradient-roam" />
        </h2>

        <div className="relative">
          {/* Garis dasar (CENTER) */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-white/10" />

          {/* Garis progress (time-travel feel) */}
          <motion.div
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 origin-top w-px bg-gradient-to-b from-green-300 to-teal-400"
            style={{ scaleY: fillY }}
          />

          {/* DOT bergerak mengikuti progress section */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-green-300 shadow-[0_0_16px_rgba(110,231,183,.8)]"
            style={{ top: dotY }}
          />

          {/* Items */}
          <div className="space-y-12">
            {items.length === 0 && (
              <p className="text-sm text-white/60">
                No experiences yet — add items in{" "}
                <code>src/data/experience.js</code>.
              </p>
            )}
            {items.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${exp.role}-${i}`}
                initial={{ y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Item
                  exp={exp}
                  align={i % 2 === 0 ? "left" : "right"}
                  active={i === activeIdx}
                  setRef={(el) => setItemRef(el, i)}
                />
              </motion.div>
            ))}
          </div>

          {/* ===== Decorative reverse-fall stars (di belakang timeline) ===== */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 hidden md:block"
          >
            {/* kiri-atas */}
            <motion.div
              className="absolute top-8 left-[12%]"
              style={{ y: upMed }}
            >
              <Star className="w-5 h-5 text-white/15" />
            </motion.div>
            {/* kanan-atas dekat garis */}
            <motion.div
              className="absolute top-4 right-[46%]"
              style={{ y: upFast }}
            >
              <Star className="w-6 h-6 text-white/12" />
            </motion.div>
            {/* kiri-tengah */}
            <motion.div
              className="absolute top-1/3 left-[20%]"
              style={{ y: upSlow }}
            >
              <Star className="w-7 h-7 text-[#ffffff1a]" />
            </motion.div>
            {/* kanan-tengah (lebih dekat garis) */}
            <motion.div
              className="absolute top-1/2 right-[48%]"
              style={{ y: upMed }}
            >
              <Star className="w-8 h-8 text-[#174b46]/20" />
            </motion.div>
            {/* kiri-bawah */}
            <motion.div
              className="absolute bottom-10 left-[14%]"
              style={{ y: upFast }}
            >
              <Star className="w-6 h-6 text-white/10" />
            </motion.div>
            {/* kanan-bawah */}
            <motion.div
              className="absolute bottom-6 right-[10%]"
              style={{ y: upSlow }}
            >
              <Star className="w-5 h-5 text-white/15" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
