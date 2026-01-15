// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// 🔥 ISSO É O QUE LIBERA firebase/auth/react-native
config.resolver.unstable_enablePackageExports = true;

module.exports = config;
