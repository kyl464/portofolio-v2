// src/components/ClientLayout.js
"use client"; // Tandai sebagai Client Component

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import OpeningScreen from "./OpeningScreen"; // Pastikan path ini benar
import Navbar from "./navbar";
import PageWrapper from "./pageWrapper";

export default function ClientLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  // Jika Anda tidak mau konten utama di-render sama sekali saat loading,
  // bungkus bagian konten utama dalam kondisi !isLoading
  const mainContent = !isLoading ? (
    <PageWrapper>
      <Navbar />
      {children}
    </PageWrapper>
  ) : null;

  return (
    <>
      <AnimatePresence>
        {isLoading && <OpeningScreen onFinished={() => setIsLoading(false)} />}
      </AnimatePresence>
      {mainContent}
    </>
  );
}
