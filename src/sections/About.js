// src/app/sections/About.js
import Image from "next/image";
import Star from "@/components/star";
import { motion, useMotionValue, useTransform } from "framer-motion";
export default function About() {
  const technologies = [
    "JavaScript (ES6+)",
    "React",
    "Next.js",
    "Node.js & Express",
    "Python",
    "C",
  ];

  const sparkleAnimationRight = {
    scale: [1, 0.8, 1],
    opacity: [1, 0.5, 1],
    rotate: [0, 180, 360],
  };

  const sparkleAnimationLeft = {
    scale: [0.8, 1, 0.8],
    opacity: [1, 0.5, 1],
    rotate: [360, 180, 0],
  };

  const sparkleTransition = {
    duration: 5,
    repeat: Infinity,
    ease: "linear",
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const slideFromRight = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section id="about" className="relative py-24 sm:py-32">
      <Star
        className="absolute top-1/4 left-[5%] w-8 h-8 text-white z-0"
        animate={sparkleAnimationRight}
        transition={sparkleTransition}
      />
      <Star
        className="absolute top-1/3 right-[30%] w-12 h-12 text-[#174b46] z-0"
        animate={sparkleAnimationLeft}
        transition={{ ...sparkleTransition, delay: 0.5 }}
      />
      <Star
        className="absolute bottom-1/6 left-[20%] w-10 h-10 text-[#174b46] z-0"
        animate={sparkleAnimationRight}
        transition={{ ...sparkleTransition, delay: 1 }}
      />
      <Star
        className="absolute bottom-1/12 right-[10%] w-12 h-12 text-white z-0"
        animate={sparkleAnimationLeft}
        transition={{ ...sparkleTransition, delay: 0.5 }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl flex items-center mb-16"
          variants={slideUp}
        >
          <span className="text-green-400 mr-4 text-2xl sm:text-3xl">01.</span>
          About Me
          <motion.div
            className="hidden lg:block ml-6 h-[2px] flex-1 rounded-full bg-gradient-to-r from-green-300 via-teal-400 to-green-300 bg-[length:200%_200%]"
            animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        </motion.h2>

        <div className="lg:grid lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-3">
            <motion.p
              className="text-lg text-gray-300 mb-6 leading-relaxed"
              variants={slideUp}
            >
              A Front-End Developer passionate about transforming ideas into
              engaging digital experiences. I bridge the gap between art and
              logic, focusing on clean code, intuitive UI, and seamless
              animations.
            </motion.p>
            <motion.p
              className="text-lg text-gray-300 leading-relaxed"
              variants={slideUp}
            >
              Driven by problem-solving, I specialize in creating interfaces
              that are both highly functional and genuinely enjoyable to
              interact with.
            </motion.p>

            <motion.ul
              className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2 text-gray-400"
              variants={slideUp}
            >
              {technologies.map((tech) => (
                <li key={tech} className="flex items-center">
                  <svg
                    className="h-6 w-6 flex-none text-green-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                  <span className="ml-2">{tech}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            className="mt-12 lg:mt-0 lg:col-span-2 flex justify-center"
            variants={slideFromRight}
          >
            <motion.div
              className="w-64 h-64 sm:w-72 sm:h-72 relative"
              style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div
                className="absolute inset-[-6px] z-0"
                style={{
                  borderRadius: "inherit",
                  background:
                    "conic-gradient(from 90deg at 50% 50%, #60a987ff, #10B981, #047857, #14B8A6, #60a987ff)",
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />

              <motion.div
                className="relative w-full h-full overflow-hidden"
                style={{ borderRadius: "inherit" }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/Me.jpeg"
                  alt="Foto Luvky Johanes"
                  layout="fill"
                  objectFit="cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
