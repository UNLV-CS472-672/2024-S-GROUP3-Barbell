import { useColorScheme } from 'react-native'
import config from '@/apps/expo/tamagui.config'
import { ToastProvider } from '@tamagui/toast'
import { TamaguiProvider, TamaguiProviderProps } from 'tamagui'
import { CustomToast } from '~/components/ui/custom-toast'
import { ToastViewport } from '~/components/ui/toast-view-port'

export function UIProvider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const scheme = useColorScheme()
  return (
    <TamaguiProvider config={config} disableInjectCSS defaultTheme={scheme === 'dark' ? 'dark' : 'light'} {...rest}>
      <ToastProvider
        swipeDirection="horizontal"
        duration={6000}
        native={
          [
            /* uncomment the next line to do native toasts on mobile. NOTE: it'll require you making a dev build and won't work with Expo Go */
            // 'mobile'
          ]
        }
      >
        {children}

        <CustomToast />
        <ToastViewport />
      </ToastProvider>
    </TamaguiProvider>
  )
}
