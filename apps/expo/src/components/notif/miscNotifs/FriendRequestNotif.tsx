import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Notification } from '@prisma/client'

import TimeAgo from '~/components/timeAgo/TimeAgo'
import { api } from '~/utils/trpc/api'

export interface FriendRequestNotifProps {
  notif: Notification
  senderUsername: string
  receiverId: number
}

export default function FriendRequestNotif({ notif, senderUsername, receiverId }: FriendRequestNotifProps) {
  const inv = api.useUtils()
  const friendsMutation = api.friend.makeFriendsReceiverIdSenderId.useMutation({
    async onSuccess() {
      inv.notif.getMiscNotifsWithSenderUsernameFromUserId.invalidate()
    },
  })

  // NOTE: friend request always has senderId
  const handleAcceptFriend = () => {
    setComponent(<></>)
    friendsMutation.mutateAsync({
      receiverId: receiverId,
      senderId: notif.senderId!,
      accepted: true,
      notificationId: notif.id,
    })
  }

  const handleDeclineFriend = () => {
    setComponent(<></>)
    friendsMutation.mutateAsync({
      receiverId: receiverId,
      senderId: notif.senderId!,
      accepted: false,
      notificationId: notif.id,
    })
  }

  // unhinged, but it works LOL
  // we do this so it will instantly remove the notification from the list
  // TRPC invalidator takes too long to remove it
  const [component, setComponent] = useState(
    <View>
      <View className="ml-3 mr-3 mt-4 flex flex-row items-center">
        {/*photo, use icon for now, probably use profile photo in the future*/}
        <View className="mr-2">
          <MaterialCommunityIcons name="face-man-profile" size={56} color="#CACACA" />
        </View>
        <View className="flex flex-1 flex-col">
          {/*sender wants to be your friend*/}
          <Text className="mb-2 mr-2" style={{ color: '#CACACA' }} testID="sender-username-with-content">
            {senderUsername} {notif.content}
          </Text>
          {/*accept and decline buttons*/}
          <View className="flex flex-row justify-between">
            <TouchableOpacity
              onPress={handleAcceptFriend}
              className="mr-1 flex-1 rounded-lg px-4 py-2"
              style={{ backgroundColor: '#48476D' }}
            >
              <Text style={{ color: '#CACACA' }} className="text-center">
                Accept
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDeclineFriend}
              className="ml-1 flex-1 rounded-lg px-4 py-2"
              style={{ backgroundColor: '#CACACA' }}
            >
              <Text className="text-center" style={{ color: '#1C1B1B' }}>
                Decline
              </Text>
            </TouchableOpacity>
          </View>
          <TimeAgo createdAt={notif.createdAt} />
        </View>
      </View>
      {/*thin line between notifications*/}
      <View className="ml-3 mr-3" style={{ borderBottomWidth: 1, borderBottomColor: '#737272' }} />
    </View>,
  )

  return component
}
