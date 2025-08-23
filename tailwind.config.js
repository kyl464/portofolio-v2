/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        spinny: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        spinny: "spinny 3s linear infinite",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        inter: ["var(--font-inter)"],
        gt: ["var(--font-gt)"],
      },
    },
  },
  plugins: [],
};
