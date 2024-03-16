import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ToastViewport as ToastViewportOg } from '@tamagui/toast'

export const ToastViewport = () => {
  const { top, right, left } = useSafeAreaInsets()
  return <ToastViewportOg top={top + 5} left={left} right={right} />
}
