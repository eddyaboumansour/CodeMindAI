const path = require("path");
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const defaultConfig = getDefaultConfig(__dirname);
const { resolver: { sourceExts, assetExts } } = defaultConfig;

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...sourceExts, "svg"],
    resolverMainFields: ["sbmodern", "react-native", "browser", "main"],
    
    extraNodeModules: {
      "web-streams-polyfill/ponyfill/es6": require.resolve("web-streams-polyfill"),
      "web-streams-polyfill": path.resolve(__dirname, "node_modules/web-streams-polyfill"),
      "react-native-fetch-api": require.resolve("react-native-polyfill-globals/src/fetch"),
      "react-native-url-polyfill": require.resolve("react-native-polyfill-globals/src/url"),
      "react-native-url-polyfill/whatwg-url": require.resolve("react-native-polyfill-globals/src/url"),
    }
  },
  watchFolders: [path.resolve(__dirname, "../")],
};

module.exports = mergeConfig(defaultConfig, config);