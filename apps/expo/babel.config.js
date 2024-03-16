/** @type {import("@babel/core").ConfigFunction} */
module.exports = (api) => {
  api.cache.forever()

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: [
      ['module:react-native-dotenv'],
      require.resolve('expo-router/babel'),
      require.resolve('react-native-reanimated/plugin'),

      /* more about tamagui here */
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './tamagui.config.ts',
          logTimings: true,
          disableExtraction: process.env.NODE_ENV === 'development',
        },
      ],
    ],
  }
}
