import { View, Text, TouchableOpacity } from "react-native"
import calculateTimeAgo from "~/utils/calculateTime";

// friend request imports
import { MaterialCommunityIcons } from '@expo/vector-icons';

const currentUTCTime = new Date().toISOString();

type notification = {type: string, subType: string, content: string, sender?: string, timeSent: string}

const notifications: notification[] = [
  {type: "misc", subType: "Friend request", content: "Elliot sent you a friend request", sender: "Elliot Wesoff", timeSent: currentUTCTime},
  {type: "misc", subType: "Friend request", content: "Marcos sent you a friend request", sender: "Marcos Villanueva", timeSent: "2024-03-14T18:30:01.202Z"},
  {type: "misc", subType: "Friend request", content: "Taylor sent you a friend request", sender: "Taylor Finelli", timeSent: "2024-03-14T17:30:01.202Z"},
  {type: "misc", subType: "Nudge", content: "Taylor nudged you", sender: "Taylor Finelli", timeSent: "2024-03-13T17:30:01.202Z"},
  // {type: "misc", subType: "Friend request", content: "Stefano sent you a friend request", sender: "Stefano Rubini", timeSent: "2024-03-10T17:30:01.202Z"},
  {type: "misc", subType: "Nudge", content: "Marcos nudged you", sender: "Marcos Villanueva", timeSent: "2024-03-5T17:30:01.202Z"},
  {type: "misc", subType: "Friend request", content: "Miguel sent you a friend request", sender: "Miguel Alvarez", timeSent: "2021-03-10T17:30:01.202Z"},
  // {type: "misc", subType: "Friend request", content: "Thien sent you a friend request", sender: "This is a really long name for testing an edge case of overflowing text"},
  // {type: "misc", subType: "Friend request", content: "Dan sent you a friend request", sender: "Daniel Hailu"},
  // {type: "misc", subType: "Friend request", content: "Tom sent you a friend request", sender: "Tom Bryant"},
  // {type: "misc", subType: "Nudge", content: "Miguel nudged you", sender: "Miguel Alvarez"},
  // {type: "misc", subType: "Friend request", content: "Henry sent you a friend request", sender: "Henry Luong"},
  // {type: "misc", subType: "Friend request", content: "Aaron sent you a friend request", sender: "Aaron Fung"},
  // {type: "misc", subType: "Friend request", content: "Thien sent you a friend request", sender: "Thien Nguyen"},
]

// notification components will go into their own files once prisma schema is done
function FriendRequestNotif({ notif }: { notif: notification }) {

  return (
    <View>
      <View className="flex flex-row items-center ml-3 mr-3 mt-4 mb-4">
        {/*profile photo*/}
          <View className="ml-3 mr-2">
            <MaterialCommunityIcons name="face-man-profile" size={56} color="#CACACA" />
          </View>
        
        <View className="flex flex-col flex-1">
          {/*sender wants to be your friend*/}
          <Text className="mr-2 mb-2" style={{color: "#CACACA"}}>{notif.sender} wants to be your friend.</Text>
          {/*accept and decline buttons*/}
          <View className="flex flex-row justify-between mr-2">
            <TouchableOpacity className="py-2 px-4 rounded-lg flex-1 mr-2" style={{backgroundColor: "#48476D"}}>
              <Text style={{color: "#CACACA"}} className="text-center">Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-2 px-4 rounded-lg flex-1 ml-2" style={{backgroundColor: "#CACACA"}}>
              <Text className="text-center" style={{color: "#1C1B1B"}}>Decline</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-right pt-2" style={{color: "#CACACA", fontSize: 11}}>{calculateTimeAgo(notif.timeSent)}</Text>
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
      <View className="flex flex-row items-center ml-3 mr-3 mt-4 mb-4">
        {/*profile photo*/}
        <View className="flex flex-col">
          <View className="ml-3 mr-2">
            <MaterialCommunityIcons name="arm-flex" size={56} color="#CACACA" />
          </View>
        </View>
        
        <View className="flex flex-col flex-1">
          {/*sender wants to be your friend*/}
          <Text className="mr-2 mb-2" style={{color: "#CACACA"}}>{notif.sender} nudged you!</Text>
          {/*accept and decline buttons*/}
          <View className="flex mr-2">
            <TouchableOpacity className="py-2 px-4 rounded-lg flex-1 mr-2" style={{backgroundColor: "#CACACA"}}>
              <Text style={{color: "#1C1B1B"}} className="text-center">Nudge back</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-right pt-2" style={{color: "#CACACA", fontSize: 11}}>{calculateTimeAgo(notif.timeSent)}</Text>
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

  return renderedNotifications
}