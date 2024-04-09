import type { Config } from 'tailwindcss'

  // @ts-expect-error - no types
import nativewind from 'nativewind/preset'

import baseConfig from '@acme/tailwind-config/native'

export default {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [baseConfig, nativewind],
  theme  : {
    extend: {
      fontFamily: {
        koulen: ['Koulen_400Regular'],

        sora              : ['Sora_400Regular'],
        'sora-thin'       : ['Sora_100Thin'],
        'sora-extra-light': ['Sora_200ExtraLight'],
        'sora-light'      : ['Sora_300Light'],
        'sora-medium'     : ['Sora_500Medium'],
        'sora-semi-bold'  : ['Sora_600SemiBold'],
        'sora-bold'       : ['Sora_700Bold'],
        'sora-extra-bold' : ['Sora_800ExtraBold'],

        'istok-web'            : ['IstokWeb_400Regular'],
        'istok-web-italic'     : ['IstokWeb_400Regular_Italic'],
        'istok-web-bold'       : ['IstokWeb_700Bold'],
        'istok-web-bold-italic': ['IstokWeb_700Bold_Italic'],
      },
      fontSize: {
        xs     : '0.75rem',    // 12px
        sm     : '0.875rem',   // 14px
        base   : '1rem',       // 16px
        lg     : '1.125rem',   // 18px
        xl     : '1.25rem',    // 20px
        '2xl'  : '1.5rem',     // 24px
        '3xl'  : '1.875rem',   // 30px
        '4xl'  : '2.25rem',    // 36px
        '5.5xl': '2.75rem',    // 44px
        '5xl'  : '3rem',       // 48px
        '6xl'  : '3.75rem',    // 60px
        '6.5xl': '4rem',       // 64px
        '7xl'  : '4.5rem',     // 72px
        '8xl'  : '6rem',       // 96px
        '9xl'  : '8rem',       // 128px
      },
      colors: {
        'slate-900'     : "#1C1B1B",
        'dark-purple'   : "#48476D",
        'slate-200'     : "#CACACA",
        'bb-dark-gray'  : '#272727',
        'bb-dark-purple': '#48476D',
        'bb-slate-100'  : '#1E1E1E',
        'light-red'     : '#9D534F',
        'light-green'   : '#55A181',
      },
    },
  },
} satisfies Config
