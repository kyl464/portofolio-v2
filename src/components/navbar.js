"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const navItems = [
  { id: "#home", label: "Home" },
  { id: "#about", label: "About" },
  { id: "#projects", label: "Projects" },
  { id: "#experience", label: "Experience" },
  { id: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [activeNav, setActiveNav] = useState("#home");
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });

  const hasScrolled = useRef(false);
  const navRef = useRef(null);
  const itemRefs = useRef(new Map());

  useEffect(() => {
    const updateHighlight = () => {
      const activeItem = itemRefs.current.get(activeNav);
      if (activeItem) {
        setHighlightStyle({
          left: activeItem.offsetLeft,
          width: activeItem.offsetWidth,
        });
      }
    };
    const raf = requestAnimationFrame(updateHighlight);
    window.addEventListener("resize", updateHighlight);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", updateHighlight);
    };
  }, [activeNav]);

  useEffect(() => {
    const handleFirstScroll = () => {
      hasScrolled.current = true;
      window.removeEventListener("scroll", handleFirstScroll);
    };
    window.addEventListener("scroll", handleFirstScroll);

    const handleTopSnap = () => {
      if (window.scrollY <= 1) setActiveNav("#home");
    };
    window.addEventListener("scroll", handleTopSnap);

    const ctx = gsap.context(() => {
      navItems.forEach((item) => {
        ScrollTrigger.create({
          trigger: item.id,
          start: item.id === "#home" ? "top top" : "top center",
          end: "bottom center",
          onEnter: () => {
            if (hasScrolled.current) setActiveNav(item.id);
          },
          onEnterBack: () => {
            if (hasScrolled.current) setActiveNav(item.id);
          },
        });
      });
    });

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("scroll", handleFirstScroll);
      window.removeEventListener("scroll", handleTopSnap);
      ctx.revert();
    };
  }, []);

  const handleNavClick = (e, navId) => {
    e.preventDefault();
    setActiveNav(navId);

    const smoother = ScrollSmoother.get();
    const targetEl = document.querySelector(navId);

    if (smoother) {
      if (!targetEl || navId === "#home") {
        smoother.scrollTo(0, true);
      } else {
        smoother.scrollTo(targetEl, true);
      }
    } else {
      if (!targetEl || navId === "#home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <nav className="fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto py-8">
        <div className="items-center justify-between hidden font-bold font-2xl w-full md:flex md:w-auto">
          <ul ref={navRef} className="relative flex items-center p-1 space-x-8">
            <span
              className="absolute bg-gray-100 rounded-full h-8 transition-all duration-300 ease-in-out"
              style={{ left: highlightStyle.left, width: highlightStyle.width }}
            />
            {navItems.map((item) => (
              <li key={item.id} ref={(el) => itemRefs.current.set(item.id, el)}>
                <a
                  href={item.id}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`relative z-10 px-3 py-1 rounded-full transition-colors duration-300 ${
                    activeNav === item.id ? "text-gray-800" : "text-[#F5F5DC]"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
