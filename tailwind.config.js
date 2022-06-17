const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./node_modules/@justinwaite/tailwind-ui/dist/**.*.js"],
  theme: {
    extend: {
      colors: {
        primary: colors.lime,
        danger: colors.red,
      },
      animation: {
        "reverse-spin": "reverse-spin 1s linear infinite",
      },
      keyframes: {
        "reverse-spin": {
          from: {
            transform: "rotate(360deg)",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
