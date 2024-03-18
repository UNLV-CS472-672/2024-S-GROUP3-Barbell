/** @type {import("@babel/core").ConfigFunction} */
module.exports = (api) => {
  // api.cache.forever()
  api.cache(true)

  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      require.resolve('expo-router/babel'),
      ['module:react-native-dotenv'],
      require.resolve('react-native-reanimated/plugin'),

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
