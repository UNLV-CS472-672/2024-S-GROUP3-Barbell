import { TouchableOpacity, View, Text } from "react-native"
import TimeAgo from "~/components/timeAgo/TimeAgo"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useGlobalContext } from "~/context/global-context"
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

export default function Conversation({ notif }: { notif: any }) {

  const { isWorkingOut, setIsWorkingOut, userData } = useGlobalContext();
  
  return (
    <View>
      <TouchableOpacity>
        <View className="flex flex-row ml-3 mr-3 mt-4">
          {/*photo, use icon for now, use profile photo in the future*/}
          <View className="mr-2">
            <MaterialCommunityIcons name="face-man-profile" size={56} color="#CACACA" />
          </View>
          
          <View className="flex flex-col flex-1">
            {/*sender name*/}
            <Text className="mr-2 mb-2" style={{color: notif.read ? "#A4A4A4" : "#FFFFFF", fontWeight: notif.read ? "normal" : "bold"}}>
              {getUsernameFromSenderId(notif.senderId)}
            </Text>
            {/*message content*/}
            <Text numberOfLines={1} className="mr-2" style={{color: notif.read ? "#A4A4A4" : "#FFFFFF"}}>{}</Text>
            <TimeAgo notif={notif} />
          </View>
        </View>
      </TouchableOpacity>
      {/*thin line between notifications*/}
      <View className="ml-3 mr-3" style={{borderBottomWidth: 1, borderBottomColor: "#737272"}}/>
    </View>
  )
}