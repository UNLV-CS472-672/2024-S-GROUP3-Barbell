import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import Button from '~/components/ui/button/button'
import PickerModal from '~/components/ui/picker-modal/picker-modal'
import { useGlobalContext } from '~/context/global-context'
import { api } from '~/utils/trpc/api'

interface FriendStatusProps {
  friendStatus: boolean | 'REQUESTED' | 'PENDING' | undefined
  viewingProfileUsername: string
  viewingProfileId: number
  setFriendStatus: any
}

export default function FriendStatus({
  friendStatus,
  viewingProfileUsername,
  viewingProfileId,
  setFriendStatus,
}: FriendStatusProps) {
  const [isModalVisible, setModalVisible] = useState<boolean>(false)
  const { userData } = useGlobalContext()
  const inv = api.useUtils()
  const deleteFriendsMutation = api.friend.deleteFriend.useMutation({
    async onSuccess() {
      inv.friend.getFriendsWithChatIdFromUserId.invalidate()
    },
  })
  const deleteFriend = () => {
    deleteFriendsMutation.mutateAsync({ id1: viewingProfileId, id2: userData?.id! })
    setModalVisible(false)
    setFriendStatus(false)
  }

  let friendStatusText: string
  if (friendStatus == 'REQUESTED') {
    friendStatusText = 'Requested'
  } else if (friendStatus == 'PENDING') {
    friendStatusText = 'Pending'
  } else if (friendStatus == true) {
    return (
      <>
        <View className='flex-1'>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View
              className='my-3 ml-4 mr-2 h-[30px] flex-1 items-center justify-center rounded-md'
              style={{ backgroundColor: '#CACACA' }}
            >
              <Text style={{ color: '#272727' }}>Friends</Text>
            </View>
          </TouchableOpacity>
        </View>
        <PickerModal
          title={`Remove ${viewingProfileUsername}?`}
          isVisible={isModalVisible}
          onBackdropPress={() => {
            setModalVisible(false)
          }}
        >
          <View className='gap-y-4 px-6 pb-4'>
            <Button onPress={deleteFriend} className='bg-light-red py-4' value='Remove' />
            <Button
              onPress={() => setModalVisible(false)}
              value='Cancel'
              color='dark'
              className='py-4'
            />
          </View>
        </PickerModal>
      </>
    )
  } else {
    friendStatusText = 'Add Friend'
  }

  return (
    <View className='flex-1'>
      <TouchableOpacity>
        <View
          className='my-3 ml-4 mr-2 h-[30px] flex-1 items-center justify-center rounded-md'
          style={{
            backgroundColor: friendStatus == 'PENDING' ? '#CACACA' : '#48476D',
          }}
        >
          <Text
            style={{
              color: friendStatus == 'PENDING' ? '#272727' : '#CACACA',
            }}
          >
            {friendStatusText}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
