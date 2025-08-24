"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default function SmoothScrollLayout({ children }) {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const smoother = ScrollSmoother.create({
      smooth: 1.2,
      effects: true,
      smoothTouch: 0.1,
      id: "main-smoother",
    });
    function setupNavLinks() {
      const links = gsap.utils.toArray("nav a");
      links.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const targetId = link.getAttribute("href");

          if (targetId === "#home") {
            smoother.scrollTo(0, true);
          } else {
            smoother.scrollTo(targetId, true, "top");
          }
        });
      });
    }

    const timeout = setTimeout(setupNavLinks, 100);

    return () => {
      clearTimeout(timeout);
      smoother.kill();
    };
  }, []);

  return (
    <>
      <div id="smooth-wrapper">
        <div id="smooth-content">{children}</div>
      </div>
    </>
  );
}
