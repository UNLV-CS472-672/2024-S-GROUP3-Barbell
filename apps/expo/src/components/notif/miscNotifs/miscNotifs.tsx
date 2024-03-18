import { View, Text } from "react-native"
import FriendRequestNotif from "./FriendRequestNotif"
import NudgeNotif from "./NudgeNotif"

// this will be replaced with an API call once completed
// for now we will use sample data
import notifData from "@/packages/db/src/mock-data/notification.json"
const notifications: any[] = notifData

const handleNotif = (notif: any, id: number) => {
  if(notif.subtype == "FRIEND_REQUEST"){
    return <FriendRequestNotif notif={notif} key={id} />
  }
  else if(notif.subtype == "NUDGE"){
    return <NudgeNotif notif={notif} key={id} />
  }
}

export default function MiscNotifs() {
  const renderedNotifications = [];
  for (let i = 0; i < notifications.length; i++) {
    const notif = notifications[i];
    renderedNotifications?.push(handleNotif(notif, notif.id))
  }

  // push some extra space to the array so that we can a little extra room at the bottom of the notifications list
  // this is best for newer mobile displays that have curved corners
  renderedNotifications.push(<View className="pb-10" key={-1}/>)

  return renderedNotifications.length == 1 ? 
    <Text className="flex pt-10 text-center" style={{color: "#CACACA"}} key={renderedNotifications.length}> No notifications to display. </Text> : 
    renderedNotifications
}
