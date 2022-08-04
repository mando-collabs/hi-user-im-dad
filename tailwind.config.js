const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./node_modules/@mando-collabs/tailwind-ui/dist/**.*.js"],
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
      transitionTimingFunction: {
        elastic: "cubic-bezier(0.5, 2, 0.5, 0.5)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
