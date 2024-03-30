/** @type {import("@babel/core").ConfigFunction} */
module.exports = (api) => {
  // api.cache.forever()
  api.cache(true)

  return {
    presets: [
      'nativewind/babel',
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }], 
    ],
    plugins: [
      ['module:react-native-dotenv'],
      require.resolve('expo-router/babel'),
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
