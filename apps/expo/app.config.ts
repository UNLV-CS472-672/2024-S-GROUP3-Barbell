import type { ExpoConfig } from '@expo/config'

const defineConfig = (): ExpoConfig => ({
  name: 'expo',
  slug: 'expo',
  scheme: 'expo',
  version: '0.1.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/icon.png',
    resizeMode: 'contain',
    backgroundColor: '#1F104A',
  },
  updates: {
    fallbackToCacheTimeout: 0,
    url: 'https://u.expo.dev/a5b98934-bf53-4573-ba91-972c22a6759a',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    bundleIdentifier: 'your.bundle.identifier',
    supportsTablet: true,
  },
  android: {
    package: 'your.bundle.identifier',
    adaptiveIcon: {
      foregroundImage: './assets/icon.png',
      backgroundColor: '#1F104A',
    },
    // jsEngine: 'hermes',
  },
  // extra: {
  //   eas: {
  //     projectId: "your-eas-project-id",
  //   },
  // },
  extra: {
    // this is commented out so you don't have to log in to run expo start locally
    // eas: {
    //   projectId: 'a5b98934-bf53-4573-ba91-972c22a6759a',
    // },
    clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
    expoPublicClerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  // jsEngine: 'hermes',
  plugins: [
    /* don't touch this */
    'expo-router',
    './expo-plugins/with-modify-gradle.js',
  ],
})

export default defineConfig
