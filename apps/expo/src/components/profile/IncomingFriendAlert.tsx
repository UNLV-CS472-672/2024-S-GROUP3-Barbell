import React, { Dispatch, SetStateAction, useState } from 'react'
import { Text, View } from 'react-native'

import { api } from '~/utils/trpc/api'
import Button from '../ui/button/button'

interface IncomingFriendAlertProps {
  username: string
  senderId: number
  receiverId: number
  notifId: number
  setFriendStatus: Dispatch<SetStateAction<boolean | 'PENDING' | 'REQUESTED'>>
}

const IncomingFriendAlert = ({
  username,
  senderId,
  receiverId,
  notifId,
  setFriendStatus,
}: IncomingFriendAlertProps) => {
  const handleAcceptFriend = () => {
    setComponent(<></>)
    setFriendStatus(true)
    friendsMutation.mutateAsync({
      receiverId: receiverId,
      senderId: senderId!,
      accepted: true,
      notificationId: notifId,
    })
  }

  const handleDeclineFriend = () => {
    setComponent(<></>)
    setFriendStatus(false)
    friendsMutation.mutateAsync({
      receiverId: receiverId,
      senderId: senderId!,
      accepted: false,
      notificationId: notifId,
    })
  }

  const [component, setComponent] = useState<React.JSX.Element>(
    <View>
      <View className='mx-2 mt-2 flex-row items-center justify-between'>
        <View className='flex-1'>
          <Text className='text-[12pt] text-slate-200'>
            {username + ' wants to be your friend'}
          </Text>
        </View>
        <View className='flex-row'>
          <Button className='mr-1 p-2' color='primary' onPress={handleAcceptFriend}>
            <Text className='text-[12pt] text-[#CACACA]'>Accept</Text>
          </Button>
          <Button className='ml-1 p-2' color='light' onPress={handleDeclineFriend}>
            <Text className='text-[12pt]'>Decline</Text>
          </Button>
        </View>
      </View>
    </View>,
  )

  const inv = api.useUtils()
  const friendsMutation = api.friend.makeFriendsReceiverIdSenderId.useMutation({
    async onSuccess() {
      inv.notif.getMiscNotifsWithSenderUsernameFromUserId.invalidate()
    },
  })

  return component
}

export default IncomingFriendAlert
