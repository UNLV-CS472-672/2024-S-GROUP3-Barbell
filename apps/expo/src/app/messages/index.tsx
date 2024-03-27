import React from 'react'
import { KeyboardAvoidingView, SafeAreaView, Text, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import MessageInput from '~/components/message/messageInput'
import { useGlobalContext } from '~/context/global-context'
import { api } from '~/utils/api';
import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon';
import { ChatType } from '@prisma/client'

// export default function MessageView() {
//   const params = useLocalSearchParams()
//   const chattingWith = params['user']?.toString().trim()
//   const { userData: user } = useGlobalContext()

//   // const {
//   //   data: messages,
//   //   isFetching,
//   //   isFetched,
//   // } = api.notif.getMessagesFromChatIdAndChatType.useQuery({
//   //   id: Number(params['chatId']),
//   // })
export default function Messages() {
  const p = useLocalSearchParams();
  const { userData: user } = useGlobalContext()
  
  const {
    data: messages,
    isFetching,
    isFetched,
  } = api.notif.getMessagesFromChatIdAndChatType.useQuery({ id: Number(p["chatId"]), type: p["type"] as ChatType })
  const chattingWith = p["chatName"]?.toString().trim()

  return (
    <SafeAreaView style={{ backgroundColor: '#1C1B1B', flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={{ flex: 1, margin: 10 }}>
          <View className="flex flex-row justify-between px-5">
            <Ionicons
              onPress={() => router.back()}
              name="chevron-back"
              size={24}
              color="#CACACA"
            />
            <Text style={{ color: '#CACACA', fontSize: 20 }}>
              {chattingWith}
            </Text>
            <View />
          </View>
          <View
            className="pt-3"
            style={{ borderBottomWidth: 1, borderBottomColor: '#737272' }}
          />
          {isFetching ? (
            <RotatingBarbellIcon />
          ) : isFetched ? (
            <View className="flex gap-y-3">
              {messages?.map((message) =>
                message.senderId == user.id ? (
                  <View key={message.id} className="bg-dark-purple w-1/2 self-end rounded-xl px-4 py-3">
                    <Text className="text-left text-slate-200">
                      {message.content + '\n'}
                    </Text>
                  </View>
                ) : (
                  <View key={message.id} className="w-1/2 self-start rounded-xl bg-zinc-800 px-4 py-3">
                    <Text className="text-left text-slate-200" >
                      {message.content + '\n'}
                    </Text>
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
