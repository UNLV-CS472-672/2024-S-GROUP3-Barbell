/** @type {import("@babel/core").ConfigFunction} */
module.exports = (api) => {
  // api.cache.forever()
  api.cache(true)

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: [
      ['module:react-native-dotenv'],
      'react-native-reanimated/plugin',
      // require.resolve('expo-router/babel'),
      // require.resolve('react-native-reanimated/plugin'),

      /* aliases */
      [
        'module-resolver',
        {
          alias: {
            '~assets': './assets',
          },
        },
      ],
    ],
  }
}
