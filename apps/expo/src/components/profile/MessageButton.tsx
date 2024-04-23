import React from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Link } from 'expo-router'

import { ChatType } from '@prisma/client'

interface MessageButtonProps {
  chatId: any
  username: string
  type: string
  userId: number
}

export default function MessageButton({ chatId, userId, username }: MessageButtonProps) {
  const type = ChatType.DIRECT
  const chatName = username

  return (
    <View className='flex-1'>
      <Link
        href={{ pathname: 'messages/', params: { chatId, chatName, type, userId } }}
        asChild={true}
      >
        <TouchableOpacity>
          <View className='my-3 ml-2 mr-4 h-[30px] flex-1 items-center justify-center rounded-md bg-[#CACACA]'>
            <Text className='text-[#272727]'>Message</Text>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  )
}
