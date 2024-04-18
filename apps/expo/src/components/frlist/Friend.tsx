import { Text, TouchableOpacity, View } from 'react-native'
import { Link } from 'expo-router'

import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { ChatType } from '@prisma/client'

interface FriendProps {
  username: string
  userId: number
  chatId: any
  name: string | null
}
export default function Friend({ username, userId, chatId, name }: FriendProps) {
  const chatType: string = ChatType.DIRECT

  const nameComponent =
    name == null ? (
      <View />
    ) : (
      <Text className='text-[16px] text-[#717171]' numberOfLines={1}>
        {name}
      </Text>
    )

  return (
    <View>
      <View className='mx-3 flex-row items-center pt-2'>
        {/* profile pic placeholder */}
        <View className='mr-2'>
          <MaterialCommunityIcons name='face-man-profile' size={56} color='#CACACA' />
        </View>

        {/* username and name */}
        <View className='flex-column flex-1'>
          <Text className='text-[16px] font-bold text-slate-200' numberOfLines={1}>
            {username.trim()}
          </Text>
          {nameComponent}
        </View>

        {/* buttons */}
        <View className='ml-5 flex-row items-center justify-between'>
          {/* view profile */}
          <View className='mx-3'>
            <Link
              href={{ pathname: 'messages/', params: { chatId, username, chatType } }}
              asChild={true}
            >
              <TouchableOpacity>
                <Ionicons name='person-outline' size={30} color='#CACACA' />
              </TouchableOpacity>
            </Link>
          </View>

          {/* open messages */}
          <Link
            href={{ pathname: 'messages/', params: { chatId, username, chatType, userId } }}
            asChild={true}
          >
            <TouchableOpacity>
              <Feather name='message-square' size={30} color='#CACACA' />
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  )
}
