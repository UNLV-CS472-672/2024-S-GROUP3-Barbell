import { TouchableOpacity, View, Text } from "react-native"
import TimeAgo from "~/components/timeAgo/TimeAgo"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useGlobalContext } from "~/context/global-context"
// TODO: change from any type to notification type once schema completed

export interface ConversationProps {
  chatId: number,
  messageContent: string,
  createdAt: Date,
  user: string | undefined,
  readBy: number[],
}

export default function Conversation({messageContent, chatId, createdAt, user, readBy}: ConversationProps) {

  const { userData } = useGlobalContext();
  console.log(chatId)
  let isRead: boolean = false;
  if(readBy.includes(userData.id)) isRead = true
  
  // inside TouchableOpacity, put the following property
  // onPress={() => openChat(chatId)}
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
            <Text className="mr-2 mb-2" style={{color: isRead ? "#A4A4A4" : "#FFFFFF", fontWeight: isRead ? "normal" : "bold"}}>
              {user}
            </Text>
            {/*message content*/}
            <Text numberOfLines={1} className="mr-2" style={{color: isRead ? "#A4A4A4" : "#FFFFFF"}}>{messageContent}</Text>
            <TimeAgo createdAt={createdAt} />
          </View>
        </View>
      </TouchableOpacity>
      {/*thin line between notifications*/}
      <View className="ml-3 mr-3" style={{borderBottomWidth: 1, borderBottomColor: "#737272"}}/>
    </View>
  )
}