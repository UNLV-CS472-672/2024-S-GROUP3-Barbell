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
import NavBar from '~/components/ui/nav-bar/NavBar'
import { useGlobalContext } from '~/context/global-context'
import { api } from '~/utils/trpc/api'

export default function MessageView() {
  const scrollViewRef: React.RefObject<ScrollView> = useRef(null)
  const p = useLocalSearchParams()
  const { userData: user } = useGlobalContext()

  let user2Id: number = 0
  if (p['type'] == ChatType.GROUP || !p['userId']) {
    user2Id = -1
  } else {
    user2Id = Number(p['userId'])
  }

  // if the chatId doesn't exist, pass in 0 so we know to create a new chat
  // else just use expected chatId
  let chatId: number
  if (p['chatId'] == null) {
    chatId = 0
  } else {
    chatId = Number(p['chatId'])
  }

  const {
    data: messages,
    isFetching,
    isFetched,
  } = api.notif.getMessagesFromChatIdAndChatType.useQuery({
    id: chatId,
    type: p['type'] as ChatType,
    user1Id: user?.id!,
    user2Id: user2Id,
  })

  const chattingWith = p['chatName']?.toString().trim()

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

  return (
    <SafeAreaView style={{ backgroundColor: '#1C1B1B', flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 80}
        style={{ flex: 1 }}
      >
        <NavBar center={chattingWith} />
        <View style={{ flex: 1, margin: 10 }}>
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
