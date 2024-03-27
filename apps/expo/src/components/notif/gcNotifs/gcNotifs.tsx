import { View, Text } from "react-native"
import { useGlobalContext } from "~/context/global-context";
import { api } from "~/utils/api"
import Conversation from "apps/expo/src/components/notif/Conversation";
import RotatingBarbellIcon from "apps/expo/src/components/notif/RotatingBarbellIcon";
import { ChatType } from '@prisma/client'
import { makeChatName } from "~/utils/makeChatName";

export default function GcNotifs() {

  const { userData } = useGlobalContext();
  const { data, isFetched, isFetching} = api.notif.getMessagePreviewsFromUserIdAndChatType.useQuery({id: userData.id, type: ChatType.GROUP })
  const renderedNotifications: any[] = []

  // Iterate over each chat object
  if(data != undefined){
    data.forEach(chat => {
      const lastMessage = chat.messages[0]
      const chatName: string = chat.name != undefined ? chat.name : makeChatName(chat.users)
      const messageContent: string = lastMessage != undefined ? lastMessage.content : String(chat.createdByUserId + " created a new chat")
      const createdAt: Date = lastMessage != undefined ? lastMessage.createdAt : chat.createdAt
      renderedNotifications.push(<Conversation key={chat.id} chatId={chat.id} 
        chatName={chatName}
        messageContent={messageContent}
        createdAt={createdAt} readBy={chat.readByUserIds} type={ChatType.GROUP} />)
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