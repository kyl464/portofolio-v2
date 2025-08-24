// src/components/PageWrapper.js
"use client";

import { motion } from "framer-motion";

export default function PageWrapper({ children }) {
  return <motion.main>{children}</motion.main>;
}
