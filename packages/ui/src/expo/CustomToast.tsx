import Constants, { ExecutionEnvironment } from 'expo-constants'
import { Toast, useToastState } from '@tamagui/toast'
import { YStack } from 'tamagui'

const NativeToast = () => {
  const currentToast = useToastState()

  if (!currentToast || currentToast.isHandledNatively) {
    return null
  }

  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      viewportName={currentToast.viewportName}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation="unset"
    >
      <YStack py="$1.5" px="$2">
        <Toast.Title lh="$1">{currentToast.title}</Toast.Title>
        {!!currentToast.message && (
          <Toast.Description>{currentToast.message}</Toast.Description>
        )}
      </YStack>
    </Toast>
  )
}

const isExpo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient

export const CustomToast = () => {
  if (isExpo) {
    return null
  } else {
    return <NativeToast />
  }
}
