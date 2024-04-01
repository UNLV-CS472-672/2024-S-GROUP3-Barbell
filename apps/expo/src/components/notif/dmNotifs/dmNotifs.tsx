import { View, Text } from "react-native"
import { useGlobalContext } from "~/context/global-context";
import { api } from "~/utils/api"
import Conversation from "apps/expo/src/components/notif/Conversation";
import RotatingBarbellIcon from "apps/expo/src/components/notif/RotatingBarbellIcon";
import { ChatType } from '@prisma/client'

export default function DmNotifs() {

  const { userData } = useGlobalContext();
  const { data, isFetched, isFetching} = api.notif.getMessagePreviewsFromUserIdAndChatType.useQuery({id: userData.id, type: ChatType.DIRECT })
  const renderedNotifications: any[] = []

  // Iterate over each chat object
  if(data != undefined){
    data.forEach(chat => {
      const messages = chat.messages;
      messages.forEach(message => {
        renderedNotifications.push(<Conversation key={chat.id} chatId={chat.id} 
          chatName={String(chat.users[0]?.username == userData.username? chat.users[1]?.username : chat.users[0]?.username)}
          messageContent={message.content} createdAt={message.createdAt} readBy={chat.readByUserIds} type={ChatType.DIRECT} />)
      });
    });
  }

  // push some extra space to the array so that we can a little extra room at the bottom of the notifications list
  // this is best for newer mobile displays that have curved corners
  renderedNotifications.push(<View className="pb-10" key={-1}/>)
  
  return renderedNotifications.length == 1 ? 
  <View>
    {isFetched && <Text className="flex pt-10 text-center" style={{color: "#CACACA"}}>No messages to display.</Text>}
    {isFetching && <RotatingBarbellIcon />}
  </View>
  : renderedNotifications
}