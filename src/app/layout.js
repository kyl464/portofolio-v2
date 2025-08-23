// src/app/layout.js
"use client"; // PENTING!

import Navbar from "@/components/navbar";
import "./globals.css";
import { motion } from "framer-motion";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <motion.main
          className="
            min-h-screen w-full
            bg-gradient-to-r from-[#faf5ff] via-[#f5f5f5] to-[#f0fdf4]
            bg-[length:300%_300%]
          "
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <Navbar />
          {children}
        </motion.main>
      </body>
    </html>
  );
}
