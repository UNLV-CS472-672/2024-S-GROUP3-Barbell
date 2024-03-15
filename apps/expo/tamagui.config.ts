import { createTamagui } from 'tamagui'
import { shorthands } from '@tamagui/shorthands'
import { themes, tokens } from '@tamagui/themes'

const appConfig = createTamagui({

	// custom usage of tamagui
	// components: {
	// 	define your custom components here
	// },
	// themes: {
	// 	define your custom themes here
	// },
	// default initialization
	themes,
	media: {
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
  	},
	// more custom usage options
	// tokens: {
	// 	define your design tokens here
	// },
	// shorthands: {
	// 	define your shorthands here
	// },
	// more default usage
	tokens,
	shorthands,
})

export type AppConfig = typeof appConfig

// overrides TamaguiCustomConfig so your custom types
// work everywhere you import `tamagui`
declare module 'tamagui' {
	interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig