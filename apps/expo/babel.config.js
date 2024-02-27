/** @type {import("@babel/core").ConfigFunction} */
module.exports = function (api) {
  api.cache.forever()

  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      require.resolve('expo-router/babel'),
      ['module:react-native-dotenv'],
      require.resolve("react-native-reanimated/plugin"),
    ],
  }
}
