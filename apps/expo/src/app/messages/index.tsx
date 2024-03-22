import { Text, View } from 'react-native'

import MessageInput from '~/components/message/messageInput'

export default function Messages() {
  return (
    <View className="absolute bottom-5 w-full">
      <MessageInput />
    </View>
  )
}
