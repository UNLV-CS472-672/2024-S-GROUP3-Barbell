import React from 'react'
import { KeyboardAvoidingView, SafeAreaView, View, Text } from 'react-native'
import { useLocalSearchParams } from "expo-router";

import MessageInput from '~/components/message/messageInput'
import { api } from '~/utils/api';
import RotatingBarbellIcon from '~/components/notif/dmNotifs/RotatingBarbellIcon';

export default function Messages() {
  const params = useLocalSearchParams();
  const p = params
  
  const response = api.notif.getDMsFromChatId.useQuery({ id: Number(p["chatId"]) })
  const data = response.data

  ////////////////////////////////////////////////////////////////////////////////////
  // TODO: stylize
  const messages: any = []
  if(data != undefined){
    data.forEach((item) => {
      messages.push(<Text style={{color: '#CACACA'}} key={item.id}>{item.senderId + ": " + item.content + '\n'}</Text>)
    })
  }
  ////////////////////////////////////////////////////////////////////////////////////

  return (
    <SafeAreaView style={{ backgroundColor: '#1C1B1B', flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={{ flex: 1, margin: 10 }}>
          {response.isFetching && <RotatingBarbellIcon />}
          {response.isFetched && messages}
        </View>
        <MessageInput />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
