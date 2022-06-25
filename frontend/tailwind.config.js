/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background))",
        button: "rgb(var(--color-button))",
      },
      letterSpacing: {
        widest: ".25em",
      },
    },
  },
  plugins: [],
};
