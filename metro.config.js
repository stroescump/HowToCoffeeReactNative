const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

module.exports = withNativeWind(
  (() => {
    const config = getDefaultConfig(__dirname);
    const { resolver, transformer } = config;

    return {
      ...config,
      transformer: {
        ...transformer,
        babelTransformerPath: require.resolve("react-native-svg-transformer"),
      },
      resolver: {
        ...resolver,
        assetExts: resolver.assetExts.filter(ext => ext !== "svg"),
        sourceExts: [...resolver.sourceExts, "svg"],
      },
    };
  })(),
  { input: './global.css' }
);