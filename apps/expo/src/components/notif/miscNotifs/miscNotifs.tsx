import { View, Text } from "react-native"
import FriendRequestNotif from "./FriendRequestNotif"
import NudgeNotif from "./NudgeNotif"
import notifData from "@/packages/db/src/mock-data/notification.json"

const notifications: any[] = notifData

// notification components will go into their own files once prisma schema is done

const handleNotif = (notif: any, index: number) => {
  if(notif.subtype == "FRIEND_REQUEST"){
    console.log(notif)
    return <FriendRequestNotif notif={notif} key={index} />
  }
  else if(notif.subtype == "NUDGE"){
    return <NudgeNotif notif={notif} key={index} />
  }
  else return <View></View>
}

export default function MiscNotifs() {
  const renderedNotifications = [];

  for (let i = 0; i < notifications.length; i++) {
    const notif = notifications[i];
    if(notif) renderedNotifications.push(handleNotif(notif, i))
  }

  renderedNotifications.push(<View className="pb-10" key={renderedNotifications.length}/>)

  return renderedNotifications.length == 1 ? 
    <Text className="flex pt-10 text-center" style={{color: "#CACACA"}} key={renderedNotifications.length}> No notifications to display. </Text> : 
    renderedNotifications
}