/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "rgb(var(--color-main))",
        button: "rgb(var(--color-button))",
      },
      letterSpacing: {
        widest: ".3em",
      },
    },
  },
  plugins: [],
};
