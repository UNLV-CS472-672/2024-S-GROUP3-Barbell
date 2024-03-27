import { Text, TouchableOpacity, View } from 'react-native'
import { Link } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import TimeAgo from '~/components/timeAgo/TimeAgo'
import { useGlobalContext } from '~/context/global-context'

export interface ConversationProps {
  chatId: number
  messageContent: string
  createdAt: Date
  user: string
  readBy: number[]
}

export default function Conversation({
  messageContent,
  chatId,
  createdAt,
  user,
  readBy,
}: ConversationProps) {
  const { userData } = useGlobalContext()
  const isRead: boolean = readBy.includes(userData.id)

  return (
    <View>
      <Link
        href={{ pathname: '/messages/', params: { chatId, user } }}
        asChild={true}
      >
        <TouchableOpacity>
          <View className="ml-3 mr-3 mt-4 flex flex-row">
            {/*photo, use icon for now, use profile photo in the future*/}
            <View className="mr-2">
              <MaterialCommunityIcons
                name="face-man-profile"
                size={56}
                color="#CACACA"
              />
            </View>
            <View className="flex flex-1 flex-col">
              {/*sender name*/}
              <Text
                className="mb-2 mr-2"
                style={{
                  color: isRead ? '#A4A4A4' : '#FFFFFF',
                  fontWeight: isRead ? 'normal' : 'bold',
                }}
              >
                {user}
              </Text>
              {/*message content*/}
              <Text
                numberOfLines={1}
                className="mr-2"
                style={{ color: isRead ? '#A4A4A4' : '#FFFFFF' }}
              >
                {messageContent}
              </Text>
              <TimeAgo createdAt={createdAt} />
            </View>
          </View>
        </TouchableOpacity>
      </Link>
      {/*thin line between notifications*/}
      <View
        className="ml-3 mr-3"
        style={{ borderBottomWidth: 1, borderBottomColor: '#737272' }}
      />
    </View>
  )
}
