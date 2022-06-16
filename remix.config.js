/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  serverBuildTarget: "netlify",
  server: "./server.js",
  // https://stackoverflow.com/questions/12632029/grunt-minimatch-glob-folder-exclusion
  ignoredRouteFiles: ["**/.*", "**/*.test.tsx?", "**/feature/**/*"],
  devServerPort: 8002,
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: ".netlify/functions-internal/server.js",
  // publicPath: "/build/",
};
