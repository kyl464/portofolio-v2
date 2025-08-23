"use client";

import Star from "@/components/star";
import { motion } from "framer-motion";

const sparkleAnimation = {
  scale: [1, 0.8, 1],
  opacity: [1, 0.5, 1],
  rotate: [0, 180, 360],
};

const sparkleTransition = {
  duration: 5,
  repeat: Infinity, // Mengulang animasi selamanya
  ease: "linear",
};

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Jeda 0.3 detik antar animasi anak
    },
  },
};

const textItemVariants = {
  hidden: { y: 20, opacity: 0 }, // Mulai dari 20px di bawah & transparan
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function Home() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen -mt-20 overflow-hidden">
      <Star
        className="absolute top-1/4 left-1/4 w-8 h-8 text-white z-0"
        animate={sparkleAnimation}
        transition={sparkleTransition}
      />
      <Star
        className="absolute top-1/2 right-1/20 w-12 h-12 text-gray-400 z-0"
        animate={sparkleAnimation}
        // Tambahkan 'delay' agar animasi tidak sinkron
        transition={{ ...sparkleTransition, delay: 0.5 }}
      />
      <Star
        className="absolute top-1/2 left-1/19 w-12 h-12 text-white z-0"
        animate={sparkleAnimation}
        // Tambahkan 'delay' agar animasi tidak sinkron
        transition={{ ...sparkleTransition, delay: 0.5 }}
      />
      <Star
        className="absolute bottom-1/4  w-6 h-6 text-white z-0"
        animate={sparkleAnimation}
        transition={{ ...sparkleTransition, delay: 1 }}
      />
      <Star
        className="absolute top-20 right-1/3 w-10 h-10 text-gray-400 z-0"
        animate={sparkleAnimation}
        transition={{ ...sparkleTransition, delay: 1.5 }}
      />

      {/* Konten utama Anda */}
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
  );
}
