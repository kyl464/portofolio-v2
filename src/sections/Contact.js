"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header center, tanpa angka/garis */}
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-gray-100 mb-12">
          Contact
        </h2>

        {/* Landscape card */}
        <div className="mx-auto w-full max-w-4xl">
          <InteractiveContactCard />
        </div>
      </div>
    </section>
  );
}

function InteractiveContactCard() {
  const wrapRef = useRef(null);

  // interaksi: geser halus (tanpa tilt)
  const x = useSpring(0, { stiffness: 120, damping: 18, mass: 0.3 });
  const y = useSpring(0, { stiffness: 120, damping: 18, mass: 0.3 });

  // posisi glow (0..1)
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let raf = null;
    const MAX_SHIFT = 12; // px

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width; // 0..1
      const ny = (e.clientY - r.top) / r.height; // 0..1
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setPos({ x: nx, y: ny });
        x.set((nx * 2 - 1) * MAX_SHIFT);
        y.set((ny * 2 - 1) * MAX_SHIFT);
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(raf);
      setPos({ x: 0.5, y: 0.5 });
      x.set(0);
      y.set(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [x, y]);

  const glowStyle = { "--x": `${pos.x * 100}%`, "--y": `${pos.y * 100}%` };

  return (
    <div ref={wrapRef} className="relative">
      {/* wrapper yang bergeser halus */}
      <motion.div style={{ x, y }} className="relative">
        {/* RUNNING BORDER (conic-gradient ring, smooth) */}
        <div
          className="pointer-events-none absolute -inset-[1.5px] rounded-xl z-20"
          style={{
            padding: "1.5px",
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            maskComposite: "exclude",
            borderRadius: "0.75rem",
          }}
        >
          <div
            className="absolute inset-0 rounded-xl bg-[conic-gradient(from_var(--a),_transparent_0,_transparent_86deg,_rgba(110,231,183,0.98)_100deg,_rgba(20,184,166,0.98)_112deg,_transparent_126deg)] blur-[0.5px] [filter:drop-shadow(0_0_6px_rgba(45,212,191,0.35))]"
            style={{
              /* var & animasi dipasang di elemen yang sama dengan gradient */
              "--a": "0deg",
              "--speed": "15s",
              animationName: "trace",
              animationDuration: "var(--speed)",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
            }}
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 rounded-xl z-0"
          style={{
            background:
              "radial-gradient(220px circle at var(--x,50%) var(--y,50%), rgba(110,231,183,0.10), transparent 60%)",
            ...glowStyle,
          }}
          aria-hidden
        />
        {/* Ambient 3D green glows (behind the card) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {/* base plate (elliptical) */}
          <div
            className="absolute -inset-x-8 -bottom-10 h-24 rounded-[3rem] blur-2xl"
            style={{
              background:
                "radial-gradient(60% 100% at 50% 100%, rgba(45,212,191,0.22), transparent 70%)",
            }}
          />
          {/* rim glow left/top */}
          <div
            className="absolute -top-6 left-[8%] w-40 h-40 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(110,231,183,0.10), transparent 70%)",
            }}
          />
          {/* rim glow right/top */}
          <div
            className="absolute -top-6 right-[8%] w-40 h-40 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(20,184,166,0.10), transparent 70%)",
            }}
          />
        </div>

        {/* CARD isi */}
        <div className="relative z-10 rounded-xl bg-[#0c1412]/80 ring-1 ring-white/10 backdrop-blur px-6 py-7 sm:px-8 sm:py-9 shadow-[0_20px_60px_rgba(0,0,0,0.35),0_0_60px_rgba(45,212,191,0.18),0_0_120px_rgba(16,185,129,0.12)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* teks rata kiri & vertikal tengah */}
            <div className="self-center">
              <p className="text-sm text-green-300/80">Let’s get in touch</p>
              <h3 className="mt-1 text-2xl font-semibold text-gray-100">
                Send me a message
              </h3>
              <p className="mt-2 text-sm text-white/60">
                I’ll get back to you as soon as possible.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                console.log("Contact form:", Object.fromEntries(fd.entries()));
              }}
              className="space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Name">
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full rounded-lg bg-white/5 text-gray-100 placeholder:text-white/40 ring-1 ring-white/10 focus:ring-2 focus:ring-green-300/60 px-3 py-2 outline-none"
                  />
                </Field>
                <Field label="Email">
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-lg bg-white/5 text-gray-100 placeholder:text-white/40 ring-1 ring-white/10 focus:ring-2 focus:ring-green-300/60 px-3 py-2 outline-none"
                  />
                </Field>
              </div>

              <Field label="Message">
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Write your message…"
                  className="w-full rounded-lg bg-white/5 text-gray-100 placeholder:text-white/40 ring-1 ring-white/10 focus:ring-2 focus:ring-green-300/60 px-3 py-2 outline-none resize-none"
                />
              </Field>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="rounded-lg px-4 py-2 text-sm font-medium bg-gradient-to-r from-green-300/90 to-teal-400/90 text-[#0c1412] ring-1 ring-white/10 hover:brightness-110 active:scale-[.99] transition"
                >
                  Send
                </button>
                <a
                  href="mailto:luvkypj13@gmail.com?subject=Hello&body=Hi%20there!"
                  className="rounded-lg px-3 py-2 text-sm text-white/90 ring-1 ring-white/10 hover:bg-white/5"
                >
                  Email directly
                </a>
              </div>
            </form>
          </div>
        </div>
      </motion.div>

      <style jsx global>{`
        /* bikin --a bisa dianimasikan sebagai sudut */
        @property --a {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }

        @keyframes trace {
          0% {
            --a: 0deg;
          }
          100% {
            --a: 360deg;
          }
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-white/80 mb-1">
        {label}
      </span>
      {children}
    </label>
  );
}
