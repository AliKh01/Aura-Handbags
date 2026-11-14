/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aura: {
          sage: "#EDEFE3",
          olive: "#868F5a",
          cream: "#F5EBDD",
          brown: "#766C51",
          pink: "#D9B9B1",
        },
      },
    },
  },
  plugins: [],
};