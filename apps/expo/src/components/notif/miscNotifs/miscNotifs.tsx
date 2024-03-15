import { View, Text, TouchableOpacity } from "react-native"

// friend request imports
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TimeAgo from "~/components/timeAgo/TimeAgo";

const currentUTCTime = new Date().toISOString();

type notification = {type: string, subType: string, content: string, sender?: string, timeSent: string}

const notifications: notification[] = [
  {type: "misc", subType: "Friend request", content: "Elliot sent you a friend request", sender: "Elliot Wesoff", timeSent: currentUTCTime},
  {type: "misc", subType: "Friend request", content: "Marcos sent you a friend request", sender: "Marcos Villanueva", timeSent: "2024-03-14T18:30:01.202Z"},
  {type: "misc", subType: "Friend request", content: "Taylor sent you a friend request", sender: "Taylor Finelli", timeSent: "2024-03-14T17:30:01.202Z"},
  {type: "misc", subType: "Nudge", content: "Taylor nudged you", sender: "Taylor Finelli", timeSent: "2024-03-13T17:30:01.202Z"},
  {type: "misc", subType: "Friend request", content: "Stefano sent you a friend request", sender: "Stefano Rubini", timeSent: "2024-03-10T17:30:01.202Z"},
  {type: "misc", subType: "Nudge", content: "Marcos nudged you", sender: "Marcos Villanueva", timeSent: "2024-03-5T17:30:01.202Z"},
  {type: "misc", subType: "Friend request", content: "Miguel sent you a friend request", sender: "Miguel Alvarez", timeSent: "2021-03-10T17:30:01.202Z"},
  {type: "misc", subType: "Friend request", content: "Thien sent you a friend request", sender: "This is a really long name for testing an edge case of overflowing text", timeSent: "2021-03-10T17:30:01.202Z"},
  {type: "misc", subType: "Friend request", content: "Dan sent you a friend request", sender: "Daniel Hailu", timeSent: "2021-03-10T17:30:01.202Z"},
  {type: "misc", subType: "Friend request", content: "Tom sent you a friend request", sender: "Tom Bryant", timeSent: "2021-03-10T17:30:01.202Z"},
  {type: "misc", subType: "Nudge", content: "Miguel nudged you", sender: "Miguel Alvarez", timeSent: "2021-03-10T17:30:01.202Z"},
  {type: "misc", subType: "Friend request", content: "Henry sent you a friend request", sender: "Henry Luong", timeSent: "2021-03-10T17:30:01.202Z"},
  {type: "misc", subType: "Friend request", content: "Aaron sent you a friend request", sender: "Aaron Fung", timeSent: "2021-03-10T17:30:01.202Z"},
  {type: "misc", subType: "Friend request", content: "Thien sent you a friend request", sender: "Thien Nguyen", timeSent: "2021-03-10T17:30:01.202Z"},
]

// notification components will go into their own files once prisma schema is done
function FriendRequestNotif({ notif }: { notif: notification }) {

  return (
    <View>
      <View className="flex flex-row items-center ml-3 mr-3 mt-4">
        {/*profile photo*/}
          <View className="mr-2">
            <MaterialCommunityIcons name="face-man-profile" size={56} color="#CACACA" />
          </View>
        
        <View className="flex flex-col flex-1">
          {/*sender wants to be your friend*/}
          <Text className="mr-2 mb-2" style={{color: "#CACACA"}}>{notif.sender} wants to be your friend.</Text>
          {/*accept and decline buttons*/}
          <View className="flex flex-row justify-between">
            <TouchableOpacity className="py-2 px-4 rounded-lg flex-1 mr-1" style={{backgroundColor: "#48476D"}}>
              <Text style={{color: "#CACACA"}} className="text-center">Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-2 px-4 rounded-lg flex-1 ml-1" style={{backgroundColor: "#CACACA"}}>
              <Text className="text-center" style={{color: "#1C1B1B"}}>Decline</Text>
            </TouchableOpacity>
          </View>
          <TimeAgo notif={notif} />
        </View>
      </View>
      {/*thin line between notifications*/}
      <View className="ml-3 mr-3" style={{borderBottomWidth: 1, borderBottomColor: "#737272"}}/>
    </View>
  )
}

function NudgeNotif({ notif }: { notif: notification }) {

  return (
    <View>
      <View className="flex flex-row items-center ml-3 mr-3 mt-4">
        {/*photo*/}
        <View className="flex flex-col">
          <View className="mr-2">
            <MaterialCommunityIcons name="arm-flex" size={56} color="#CACACA" />
          </View>
        </View>
        
        <View className="flex flex-col flex-1">
          {/*nudged text*/}
          <Text className="mr-2 mb-2" style={{color: "#CACACA"}}>{notif.sender} nudged you!</Text>
          {/*nudge back button*/}
          <TouchableOpacity className="py-2 px-4 rounded-lg flex-1" style={{backgroundColor: "#CACACA"}}>
            <Text style={{color: "#1C1B1B"}} className="text-center">Nudge back</Text>
          </TouchableOpacity>
          <TimeAgo notif={notif} />
        </View>
      </View>
      {/*thin line between notifications*/}
      <View className="ml-3 mr-3" style={{borderBottomWidth: 1, borderBottomColor: "#737272"}}/>
    </View>
  )
}

const handleNotif = (notif: notification, index: number) => {
  if(notif.subType == "Friend request"){
    return <FriendRequestNotif notif={notif} key={index} />
  }
  else if(notif.subType == "Nudge"){
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