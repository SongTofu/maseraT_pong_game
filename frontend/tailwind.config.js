/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        main: "rgb(var(--color-main))",
        "main-light": "rgb(var(--color-main-light))",
        "main-text": "rgb(var(--color-main-text))",
        button: "rgb(var(--color-button))",
      },
      letterSpacing: {
        widest: "0.3em",
      },
      fontFamily: {
        main: [],
      },
    },
  },
  plugins: [],
};
