// src/components/OpeningScreen.js
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import styles from "./OpeningScreen.module.css";

const texts = [
  "Web Developer",
  "Next.JS Enthusiast",
  "Creative Coder",
  "Hello!",
];

const OpeningScreen = ({ onFinished }) => {
  const [index, setIndex] = useState(0);
  const [isIntroFinished, setIsIntroFinished] = useState(false);

  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const textContainerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsIntroFinished(true),
    });

    tl.from(logoRef.current, {
      xPercent: 150,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    }).from(
      textContainerRef.current,
      {
        xPercent: -150,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      },
      "-=1.0"
    );
  }, []);

  useEffect(() => {
    if (!isIntroFinished) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % texts.length;
        if (nextIndex === texts.length - 1) {
          clearInterval(interval);
        }
        return nextIndex;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isIntroFinished]);

  useEffect(() => {
    if (index === texts.length - 1) {
      const timer = setTimeout(() => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "power4.inOut",
          onComplete: onFinished,
        });
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [index, onFinished]);

  return (
    <div ref={containerRef} className={styles.openingScreen}>
      <div className={styles.contentWrapper}>
        <motion.div
          ref={logoRef}
          className={styles.logo}
          initial={{ x: -150, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
          <img
            src="/Logo-transparent.svg"
            width={60}
            height={60}
            alt="Logo"
            style={{ objectFit: "contain" }}
          />
        </motion.div>
        <motion.div
          ref={textContainerRef}
          className={styles.textContainer}
          initial={{ x: 150, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1 }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
              className={styles.text}
            >
              {isIntroFinished ? texts[index] : ""}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default OpeningScreen;
