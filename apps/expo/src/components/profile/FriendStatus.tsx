import React from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface FriendStatusProps {
  friendStatus: boolean | 'REQUESTED' | 'PENDING' | undefined
}

export default function FriendStatus({ friendStatus }: FriendStatusProps) {
  let friendStatusText: string
  if (friendStatus == 'REQUESTED') {
    friendStatusText = 'Requested'
  } else if (friendStatus == 'PENDING') {
    friendStatusText = 'Pending'
  } else if (friendStatus == true) {
    friendStatusText = 'Friends'
  } else {
    friendStatusText = 'Add Friend'
  }

  return (
    <View className='flex-1'>
      <TouchableOpacity>
        <View
          className={`my-3 ml-4 mr-2 h-[30px] flex-1 items-center justify-center rounded-md bg-[#${
            friendStatus == true || friendStatus == 'PENDING' ? 'CACACA' : '48476D'
          }]`}
        >
          <Text
            className={`text-[#${
              friendStatus == true || friendStatus == 'PENDING' ? '272727' : 'CACACA'
            }]`}
          >
            {friendStatusText}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
