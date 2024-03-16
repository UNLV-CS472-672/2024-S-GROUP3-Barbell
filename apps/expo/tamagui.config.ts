import { animations } from '@/apps/expo/src/utils/animation'
import { createMedia } from '@tamagui/react-native-media-driver'
import { shorthands } from '@tamagui/shorthands'
import { tokens } from '@tamagui/themes/v2'
import { themes } from '@tamagui/themes/v2-themes'
import { createTamagui } from 'tamagui'

// import { themes, tokens } from '@tamagui/themes'

export const appConfig = createTamagui({
  // custom usage of tamagui
  // components: {
  // 	define your custom components here
  // },
  // themes: {
  // 	define your custom themes here
  // },
  // default initialization
  fonts: {},
  themes,
  animations,
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
  // highly recommended to turn this on if you are using shorthands
  // to avoid having multiple valid style keys that do the same thing
  // we leave it off by default because it can be confusing as you onboard.
  onlyAllowShorthands: false,
  tokens,
  shorthands,
})

export type AppConfig = typeof appConfig

// overrides TamaguiCustomConfig so your custom types
// work everywhere you import `tamagui`
declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

// so the compiler can find it
export default appConfig
