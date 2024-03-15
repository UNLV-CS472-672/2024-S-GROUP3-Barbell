/** @type {import("@babel/core").ConfigFunction} */
module.exports = (api) => {
  api.cache.forever()

  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      ['module:react-native-dotenv'],
      require.resolve('expo-router/babel'),
      require.resolve('react-native-reanimated/plugin'),

      /* more about tamagui here */
    ],
  }
}
