import { View, Text, TouchableOpacity } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import TimeAgo from "~/components/timeAgo/TimeAgo"
import { Notification } from '@prisma/client'

export interface FriendRequestNotifProps {
  notif: Notification,
  senderUsername: string,
}

export default function FriendRequestNotif({notif, senderUsername}: FriendRequestNotifProps) {

  return (
    <View>
      <View className="flex flex-row items-center ml-3 mr-3 mt-4">
        {/*photo, use icon for now, probably use profile photo in the future*/}
        <View className="mr-2">
          <MaterialCommunityIcons name="face-man-profile" size={56} color="#CACACA" />
        </View>
        
        <View className="flex flex-col flex-1">
          {/*sender wants to be your friend*/}
          <Text className="mr-2 mb-2" style={{color: "#CACACA"}}>{senderUsername} {notif.content}</Text>
          {/*accept and decline buttons*/}
          <View className="flex flex-row justify-between">
            <TouchableOpacity className="py-2 px-4 rounded-lg flex-1 mr-1" style={{backgroundColor: "#48476D"}}>
              <Text style={{color: "#CACACA"}} className="text-center">Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-2 px-4 rounded-lg flex-1 ml-1" style={{backgroundColor: "#CACACA"}}>
              <Text className="text-center" style={{color: "#1C1B1B"}}>Decline</Text>
            </TouchableOpacity>
          </View>
          <TimeAgo createdAt={notif.createdAt} />
        </View>
      </View>
      {/*thin line between notifications*/}
      <View className="ml-3 mr-3" style={{borderBottomWidth: 1, borderBottomColor: "#737272"}}/>
    </View>
  )
}