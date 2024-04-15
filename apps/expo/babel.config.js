/** @type {import("@babel/core").ConfigFunction} */
module.exports = (api) => {
  // api.cache.forever()
  api.cache(true)

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: [
      /* 50 */
      'react-native-reanimated/plugin',

      /* 49 */
      // ['module:react-native-dotenv'],
      // require.resolve('expo-router/babel'),
      // require.resolve('react-native-reanimated/plugin'),
    ],
  }
}
