/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  safelist: [
    "bg-stone-300",
    "bg-stone-100",
    "text-stone-700",
    "bg-cyan-300",
    "bg-cyan-100",
    "text-cyan-700",
    "bg-teal-300",
    "bg-teal-100",
    "text-teal-700",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
