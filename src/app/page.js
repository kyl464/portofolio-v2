"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Star from "@/components/star";
import About from "@/sections/About";
import SmoothScrollLayout from "@/components/SmoothScrollLayout";
import Projects from "@/sections/Projects";
import Contact from "@/sections/contact";
import Experience from "@/sections/Experience";
import Footer from "@/sections/Footer";
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

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const textItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export default function Home() {
  const heroRef = useRef(null);
  const aboutWrapperRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const starYTarget1 = useTransform(scrollYProgress, [0, 1], [0, -450]);
  const starYTarget2 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const starYTarget3 = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const starOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);
  const springConfig = { stiffness: 100, damping: 20, restDelta: 0.001 };
  const starY1 = useSpring(starYTarget1, springConfig);
  const starY2 = useSpring(starYTarget2, springConfig);
  const starY3 = useSpring(starYTarget3, springConfig);

  return (
    <SmoothScrollLayout>
      <main>
        <div className="relative z-20">
          <div
            id="home"
            ref={heroRef}
            className="relative z-10 flex flex-col items-center justify-center min-h-screen -mt-10 overflow-hidden"
          >
            <motion.div
              className="absolute top-1/4 left-1/4 w-8 h-8 text-white z-0"
              style={{ y: starY2, opacity: starOpacity }}
            >
              <Star
                animate={sparkleAnimationRight}
                transition={sparkleTransition}
              />
            </motion.div>

            <motion.div
              className="absolute top-1/2 right-1/20 w-12 h-12 text-gray-400 z-0"
              style={{ y: starY1, opacity: starOpacity }}
            >
              <Star
                animate={sparkleAnimationLeft}
                transition={{ ...sparkleTransition, delay: 0.5 }}
              />
            </motion.div>

            <motion.div
              className="absolute top-1/2 left-1/19 w-12 h-12 text-white z-0"
              style={{ y: starY3, opacity: starOpacity }}
            >
              <Star
                animate={sparkleAnimationRight}
                transition={{ ...sparkleTransition, delay: 1 }}
              />
            </motion.div>

            <motion.div
              className="absolute bottom-1/5  w-6 h-6 text-white z-0"
              style={{ y: starY2, opacity: starOpacity }}
            >
              <Star
                animate={sparkleAnimationLeft}
                transition={{ ...sparkleTransition, delay: 1.5 }}
              />
            </motion.div>

            <motion.div
              className="absolute top-1/4 right-1/3 w-10 h-10 text-gray-400 z-0"
              style={{ y: starY3, opacity: starOpacity }}
            >
              <Star
                animate={sparkleAnimationLeft}
                transition={{ ...sparkleTransition, delay: 1.5 }}
              />
            </motion.div>

            <motion.div
              className="relative z-10 text-center"
              variants={textContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                className="text-8xl font-bold text-gray-100 leading-tight"
                variants={textItemVariants}
              >
                <span className="block">Hi. I&apos;m Luvky.</span>
                <span className="block">A Frontend Developer.</span>
              </motion.h1>
              <motion.h3
                className="mt-6 text-gray-300 text-lg max-w-2xl text-center mx-auto"
                variants={textItemVariants}
              >
                Passionate about the intersection of code and design, I engineer
                seamless, user-centric web experiences.
              </motion.h3>
            </motion.div>
          </div>

          {/* ANIMASI SCROLL REVERSE FALL BINTANG DI GAP KOSONG */}
          <motion.div
            className="absolute bottom-1/2 right-1/3 w-15 h-15 text-white z-0"
            style={{ y: starY3, opacity: starOpacity }}
          >
            <Star
              animate={sparkleAnimationRight}
              transition={{ ...sparkleTransition, delay: 1.5 }}
            />
          </motion.div>
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-12 h-12 text-gray-400 z-0"
            style={{ y: starY3, opacity: starOpacity }}
          >
            <Star
              animate={sparkleAnimationLeft}
              transition={{ ...sparkleTransition, delay: 1.5 }}
            />
          </motion.div>

          <motion.div
            className="absolute bottom-1/3 left-1/4 w-7 h-7 text-[#174b46] z-0"
            style={{ y: starY3, opacity: starOpacity }}
          >
            <Star
              animate={sparkleAnimationRight}
              transition={{ ...sparkleTransition, delay: 1.5 }}
            />
          </motion.div>

          <motion.div
            className="absolute top left-1/6 w-10 h-10 text-gray-400 z-0"
            style={{ y: starY3, opacity: starOpacity }}
          >
            <Star
              animate={sparkleAnimationLeft}
              transition={{ ...sparkleTransition, delay: 1.5 }}
            />
          </motion.div>

          <motion.div
            className="absolute bottom right-1/10 w-9 h-9 text-[#174b46] z-0"
            style={{ y: starY3, opacity: starOpacity }}
          >
            <Star
              animate={sparkleAnimationRight}
              transition={{ ...sparkleTransition, delay: 1.5 }}
            />
          </motion.div>

          {/*Section */}
          <motion.div
            ref={aboutWrapperRef}
            className="min-h-screen flex items-center justify-center"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <About />
          </motion.div>
          <motion.div
            className="min-h-screen flex items-center justify-center"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <Projects />
          </motion.div>

          <motion.div
            className="min-h-screen flex items-center justify-center"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <Experience />
          </motion.div>
          <motion.div
            className="min-h-screen flex items-center justify-center"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <Contact />
          </motion.div>
          <Footer />
        </div>
      </main>
    </SmoothScrollLayout>
  );
}
