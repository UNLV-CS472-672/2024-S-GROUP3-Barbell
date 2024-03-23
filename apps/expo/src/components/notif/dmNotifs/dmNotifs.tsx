import { View, Text } from "react-native"
import { useGlobalContext } from "~/context/global-context";
import { api } from "~/utils/api"
import Conversation from "./Conversation";
import { useEffect, useState } from "react";
import RotatingBarbellIcon from "./RotatingBarbellIcon";

export default function DmNotifs() {
  const { userData } = useGlobalContext();
  const messagePreviews = api.notif.getMessagePreviewsFromUserId.useQuery({id: userData.id })
  const data = messagePreviews.data
  const renderedNotifications: any[] = []

  // Iterate over each chat object
  if(data != undefined){
    data.forEach(chat => {
      const messages = chat.messages;
      messages.forEach(message => {
        renderedNotifications.push(<Conversation key={chat.id} chatId={chat.id} 
          user={chat.users[0]?.username == userData.username? chat.users[1]?.username : chat.users[0]?.username}
          messageContent={message.content} createdAt={message.createdAt} readBy={chat.readByUserIds} />)
      });
    });
  }

  // push some extra space to the array so that we can a little extra room at the bottom of the notifications list
  // this is best for newer mobile displays that have curved corners
  renderedNotifications.push(<View className="pb-10" key={-1}/>)
  
  return renderedNotifications.length == 1 ? 
  <View>
    {messagePreviews.isFetched && <Text className="flex pt-10 text-center" style={{color: "#CACACA"}}>No messages to display.</Text>}
    {messagePreviews.isFetching && <RotatingBarbellIcon />}
  </View>
  : renderedNotifications
}