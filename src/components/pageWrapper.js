// src/components/PageWrapper.js
"use client";

import { motion } from "framer-motion";

export default function PageWrapper({ children }) {
  return (
    <motion.main
      className="
        min-h-screen w-full
        bg-gradient-to-r from-[#1e1b4b] via-[#134e4a] to-[#065f46]
        bg-[length:300%_300%]
      "
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 5,
        ease: "linear",
        repeat: Infinity,
      }}
    >
      {children}
    </motion.main>
  );
}
