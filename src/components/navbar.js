"use client";
import React, { useState, useEffect, useRef } from "react";

const navItems = [
  { id: "Work", label: "Work" },
  { id: "About", label: "About" },
  { id: "Play", label: "Play" },
  { id: "Notes", label: "Notes" },
  { id: "Contact", label: "Contact" },
];

export default function Navbar() {
  const [activeNav, setActiveNav] = useState("Work");
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
  }, [activeNav]);

  return (
    <nav className="fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto py-8">
        <div className="items-center justify-between hidden font-bold font-2xl w-full md:flex md:w-auto">
          {/* Tambahkan 'relative' agar highlight bisa diposisikan di dalamnya */}
          <ul ref={navRef} className="relative flex items-center p-1 space-x-8">
            {/* ELEMEN HIGHLIGHT BARU */}
            <span
              className="absolute bg-gray-100 rounded-full h-8 transition-all duration-300 ease-in-out"
              style={{ left: highlightStyle.left, width: highlightStyle.width }}
            />

            {navItems.map((item) => (
              <li key={item.id} ref={(el) => itemRefs.current.set(item.id, el)}>
                <a
                  href="#"
                  onClick={() => setActiveNav(item.id)}
                  className={`relative z-10 px-3 py-1 rounded-full transition-colors duration-300
                    ${activeNav === item.id ? "text-gray-800" : "text-gray-500"}
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
