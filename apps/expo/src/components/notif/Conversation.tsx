import { TouchableOpacity, View, Text } from "react-native"
import TimeAgo from "~/components/timeAgo/TimeAgo"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useGlobalContext } from "~/context/global-context"
import { Link } from "expo-router"
import { ChatType } from '@prisma/client'

export interface ConversationProps {
  chatId: number,
  messageContent: string,
  createdAt: Date,
  chatName: string,
  readBy: number[],
  type: ChatType,
}

export default function Conversation({messageContent, chatId, createdAt, chatName, readBy, type}: ConversationProps) {

  const { userData } = useGlobalContext();
  const isRead: boolean = readBy.includes(userData.id)
  
  return (
    <View>
      <Link href={{pathname: "/messages/", params: {chatId, chatName, type}}} asChild={true}>
        <TouchableOpacity>
          <View className="flex flex-row ml-3 mr-3 mt-4">
            {/*photo, use icon for now, use profile photo in the future*/}
            <View className="mr-2">
              <MaterialCommunityIcons name="face-man-profile" size={56} color="#CACACA" />
            </View>
            <View className="flex flex-col flex-1">
              {/*sender name*/}
              <Text className="mr-2 mb-2" style={{color: isRead ? "#A4A4A4" : "#FFFFFF", fontWeight: isRead ? "normal" : "bold"}}>
                {chatName}
              </Text>
              {/*message content*/}
              <Text numberOfLines={1} className="mr-2" style={{color: isRead ? "#A4A4A4" : "#FFFFFF"}}>{messageContent}</Text>
              <TimeAgo createdAt={createdAt} />
            </View>
          </View>
        </TouchableOpacity>
      </Link>
      {/*thin line between notifications*/}
      <View className="ml-3 mr-3" style={{borderBottomWidth: 1, borderBottomColor: "#737272"}}/>
    </View>
  )
}