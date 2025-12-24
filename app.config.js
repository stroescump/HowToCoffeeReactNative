const path = require("path");

try {
  require("dotenv").config({ path: path.resolve(__dirname, ".env.local") });
} catch {
  // Ignore if dotenv isn't installed yet.
}

module.exports = ({ config }) => ({
  ...config,
  extra: {
    ...(config.extra ?? {}),
    DEV_JWT: process.env.DEV_JWT ?? null,
  },
});
