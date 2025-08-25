// src/components/ClientLayout.js
"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import OpeningScreen from "./OpeningScreen";
import Navbar from "./navbar";
import PageWrapper from "./pageWrapper";

export default function ClientLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  const mainContent = !isLoading ? (
    <>
      <Navbar />
      <PageWrapper>{children}</PageWrapper>
    </>
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
