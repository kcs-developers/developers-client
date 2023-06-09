const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  content: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        accent: {
          100: "#4785dcf0",
          200: "#3d6fb5",
          300: "#2c538a",
          400: "#23416a",
          500: "#192f4e",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
