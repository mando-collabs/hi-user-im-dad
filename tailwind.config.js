const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./node_modules/@justinwaite/tailwind-ui/dist/**.*.js"],
  theme: {
    extend: {
      colors: {
        primary: colors.lime,
        danger: colors.red,
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
