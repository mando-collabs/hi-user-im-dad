module.exports = {
  "!(*rc)*.{ts,tsx,js,jsx}": (filenames) => {
    return [`eslint --cache --fix --max-warnings=0 ${filenames.map((filename) => `'${filename}'`).join(" ")}`];
  },
  "*.{css,html,json}": "npx prettier --write",
};
