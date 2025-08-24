"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const navItems = [
  { id: "#home", label: "Home" },
  { id: "#about", label: "About" },
  { id: "#play", label: "Play" },
  { id: "#notes", label: "Notes" },
  { id: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [activeNav, setActiveNav] = useState("#home");
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });

  const navRef = useRef(null);
  const itemRefs = useRef(new Map());

  useEffect(() => {
    const activeItem = itemRefs.current.get(activeNav);
    if (activeItem) {
      setHighlightStyle({
        left: activeItem.offsetLeft,
        width: activeItem.offsetWidth,
      });
    }
    gsap.registerPlugin(ScrollTrigger);
  }, [activeNav]);
  const handleNavClick = (e, navId) => {
    e.preventDefault();
    setActiveNav(navId);

    const smoother = ScrollTrigger.getById("main-smoother");
    if (smoother) {
      if (navId === "#home") {
        smoother.scrollTo(0, true);
        smoother.scrollTo(navId, true, "top top+=100px");
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
                  onClick={() => setActiveNav(item.id)}
                  className={`relative z-10 px-3 py-1 rounded-full transition-colors duration-300
                    ${
                      activeNav === item.id ? "text-gray-800" : "text-[#F5F5DC]"
                    }
                  `}
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
