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
        sparkle: {
          "0%, 100%": { opacity: 1, transform: "scale(1) rotate(0deg)" },
          "50%": { opacity: 0.5, transform: "scale(0.8) rotate(180deg)" },
        },
      },
      animation: {
        spinny: "spinny 3s linear infinite",
        sparkle: "sparkle 5s linear infinite",
      },
    },
  },
  plugins: [],
};
