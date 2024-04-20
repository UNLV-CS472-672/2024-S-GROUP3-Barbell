import React, { useEffect, useRef } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { router, useLocalSearchParams } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'
import { ChatType } from '@prisma/client'

import MessageInput from '~/components/message/messageInput'
import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import { useGlobalContext } from '~/context/global-context'
import { api } from '~/utils/trpc/api'

export default function MessageView() {
  const scrollViewRef: React.RefObject<ScrollView> = useRef(null)
  const p = useLocalSearchParams()
  const { userData: user } = useGlobalContext()

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true })
      }
    })

    return () => {
      keyboardDidShowListener.remove()
    }
  }, [])

  const {
    data: messages,
    isFetching,
    isFetched,
  } = api.notif.getMessagesFromChatIdAndChatType.useQuery({
    id: Number(p['chatId']),
    type: p['type'] as ChatType,
  })
  const chattingWith = p['chatName']?.toString().trim()

  return (
    <SafeAreaView style={{ backgroundColor: '#1C1B1B', flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 80}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, margin: 10 }}>
          <View className='flex flex-row justify-between px-5'>
            <Ionicons onPress={() => router.back()} name='chevron-back' size={24} color='#CACACA' />
            <Text style={{ color: '#CACACA', fontSize: 20 }}>{chattingWith}</Text>
            <View />
          </View>
          <View className='pt-3' style={{ borderBottomWidth: 1, borderBottomColor: '#737272' }} />
          {isFetching ? (
            <RotatingBarbellIcon />
          ) : isFetched ? (
            <ScrollView
              className='flex gap-y-3'
              ref={scrollViewRef}
              onContentSizeChange={() =>
                scrollViewRef.current && scrollViewRef.current.scrollToEnd({ animated: true })
              }
            >
              <View className='h-fit gap-y-3'>
                {messages?.map((message) =>
                  message.senderId == user?.id ? (
                    <View
                      key={message.id}
                      className='bg-dark-purple w-1/2 self-end rounded-xl px-4 pt-3'
                    >
                      <Text className='text-left text-slate-200'>{message.content + '\n'}</Text>
                    </View>
                  ) : (
                    <View
                      key={message.id}
                      className='w-1/2 self-start rounded-xl bg-zinc-800 px-4 pt-3'
                    >
                      <Text className='text-left text-slate-200'>{message.content + '\n'}</Text>
                    </View>
                  ),
                )}
              </View>
            </ScrollView>
          ) : (
            <Text>Issue retrieving messages</Text>
          )}
        </View>
        <MessageInput />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
