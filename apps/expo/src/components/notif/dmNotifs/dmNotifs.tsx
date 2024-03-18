import { View, Text } from "react-native"
import Conversation from "./Conversation"
import { useGlobalContext } from "~/context/global-context";

// these will be replaced with API calls once completed
// for now we will use sample data
import notifData from "@/packages/db/src/mock-data/notification.json"
const notifications: any[] = notifData
const userData = {
    "id": 4,
    "username": "userFour",
    "email": "userfour@example.com",
    "name": "User Four",
    "status": "OFFLINE",
    "streak": 2
}

function getConversations(userData: any) {
  let convoSet = new Set<any>()
  for (let i = 0; i < notifData.length; i++) {
    if (notifData[i]?.type === "DM" && notifData[i]?.receiverId === userData.id) {
      convoSet.add(notifData[i]?.senderId);
    } else if (notifData[i]?.type === "DM" && notifData[i]?.senderId === userData.id) {
      convoSet.add(notifData[i]?.receiverId);
    }
  }

  return Array.from(convoSet)
}

function getMessagePreviews(userData: any, conversations: any[]): [number, string][]{
  for(let i = 0; i < notifData.length; i++){
    for(let j = 0; j < conversations.length; j++){

    }
  }
  return []
}

export default function DmNotifs(notif: any) {
  // const { isWorkingOut, setIsWorkingOut, userData } = useGlobalContext();
  const conversations = getConversations(userData);
  const messagePreviews = getMessagePreviews(userData, conversations);
  console.log(conversations)
  const renderedNotifications = [];
  for (let i = 0; i < notifications.length; i++) {
    const notif = notifications[i];
    if(notif.type == 'DM') renderedNotifications.push(<Conversation notif={notif} key={notif.id}/>)
  }

  // push some extra space to the array so that we can a little extra room at the bottom of the notifications list
  // this is best for newer mobile displays that have curved corners
  renderedNotifications.push(<View className="pb-10" key={-1}/>)

  return renderedNotifications.length == 1 ? 
    <Text className="flex pt-10 text-center" style={{color: "#CACACA"}} key={renderedNotifications.length}> No notifications to display. </Text> : 
    renderedNotifications
}