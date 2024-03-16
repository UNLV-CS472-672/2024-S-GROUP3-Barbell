import { useColorScheme } from 'react-native'
import config from '@/apps/expo/tamagui.config'
import { TamaguiProvider, TamaguiProviderProps } from 'tamagui'
// import { ToastProvider } from '@tamagui/toast'
// import { CustomToast } from '~/components/ui/custom-toast'
// import { ToastViewport } from '~/components/ui/toast-view-port'

export function UIProvider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const scheme = useColorScheme()
  return (
    <TamaguiProvider config={config} disableInjectCSS defaultTheme={scheme === 'dark' ? 'dark' : 'light'} {...rest}>
      {children}
    </TamaguiProvider>
  )
}
