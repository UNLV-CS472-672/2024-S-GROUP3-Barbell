import React from 'react'
import { KeyboardAvoidingView, SafeAreaView, Text, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'
import { ChatType } from '@prisma/client'

import MessageInput from '~/components/message/messageInput'
import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import { useGlobalContext } from '~/context/global-context'
import { api } from '~/utils/trpc/api'

export default function MessageView() {
  const p = useLocalSearchParams()
  const { userData } = useGlobalContext()

  // there is no user2 for group chats
  // the user2Id field is also only used within the friends page
  // if either case is hit let's just use -1 as the param so we dont use random userId
  let user2Id: number = 0
  if (p['type'] == ChatType.GROUP || !p['userId']) {
    user2Id = -1
  } else {
    user2Id = Number(p['userId'])
  }

  // if the chatId doesn't exist, pass in -1 so we know to create a new chat
  // else just use expected chatId
  let chatId: number = 0
  if (p['chatId'] == null) {
    chatId = -1
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
    user1Id: userData?.id!,
    user2Id: user2Id,
  })
  const chattingWith = p['chatName']?.toString().trim()

  return (
    <SafeAreaView style={{ backgroundColor: '#1C1B1B', flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
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
            <View className='flex gap-y-3'>
              {messages?.map((message) =>
                message.senderId == userData?.id ? (
                  <View
                    key={message.id}
                    className='bg-dark-purple w-1/2 self-end rounded-xl px-4 py-3'
                  >
                    <Text className='text-left text-slate-200'>{message.content + '\n'}</Text>
                  </View>
                ) : (
                  <View
                    key={message.id}
                    className='w-1/2 self-start rounded-xl bg-zinc-800 px-4 py-3'
                  >
                    <Text className='text-left text-slate-200'>{message.content + '\n'}</Text>
                  </View>
                ),
              )}
            </View>
          ) : (
            <Text>Issue retriving messages</Text>
          )}
        </View>
        <MessageInput />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
