import { View, Text, TouchableOpacity } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import TimeAgo from "~/components/timeAgo/TimeAgo"
// TODO: change from any type to notification type once schema completed
//////////////////////////////////////////////////////////////////////////
// can delete from here ...
import userData from "@/packages/db/src/mock-data/user.json"
const userInfo: any[] = userData
function getUsernameFromSenderId(senderId: number): string {
  const user = userInfo.find((item) => item.id === senderId);
  if (user) {
    return user.username;
  } else {
    return String(senderId);
  }
}
// to here once we get the API setup to get username from sender ID
//////////////////////////////////////////////////////////////////////////

export default function NudgeNotif({ notif }: { notif: any }) {

  return (
    <View>
      <View className="flex flex-row items-center ml-3 mr-3 mt-4">
        {/*flexing arm is the placeholder, might change in future*/}
        <View className="flex flex-col">
          <View className="mr-2">
            <MaterialCommunityIcons name="arm-flex" size={56} color="#CACACA" />
          </View>
        </View>
        
        <View className="flex flex-col flex-1">
          {/*nudged text*/}
          <Text className="mr-2 mb-2" style={{color: "#CACACA"}}>{getUsernameFromSenderId(notif.senderId)} {notif.content}</Text>
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