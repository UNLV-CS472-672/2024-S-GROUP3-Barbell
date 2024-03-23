import React from 'react'
import { KeyboardAvoidingView, SafeAreaView, View } from 'react-native'

import MessageInput from '~/components/message/messageInput'

export default function Messages() {
  return (
    <SafeAreaView style={{ backgroundColor: '#1C1B1B', flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={{ flex: 1 }}>{/* Your main content here */}</View>
        <MessageInput />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
