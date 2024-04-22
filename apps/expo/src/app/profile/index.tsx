import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ChatType } from '@prisma/client'

import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import FriendStatus from '~/components/profile/FriendStatus'
import HeaderElement from '~/components/profile/HeaderElement'
import IncomingFriendAlert from '~/components/profile/IncomingFriendAlert'
import MessageButton from '~/components/profile/MessageButton'
import NavBar from '~/components/ui/nav-bar/NavBar'
import { useGlobalContext } from '~/context/global-context'
import { api } from '~/utils/trpc/api'

export default function ProfileView() {
  const p = useLocalSearchParams()
  const viewingProfileId: number = Number(p['userId'])
  const viewingProfileUsername: string = String(p['username']).trim()
  const { userData } = useGlobalContext()
  const { data, isLoading, refetch } = api.user.getProfileInfoById.useQuery({
    viewingProfileId: viewingProfileId,
    loggedInUserId: userData?.id!,
  })
  const status = data?.friendStatus
  const [friendStatus, setFriendStatus] = useState<any>(status)

  useEffect(() => {
    setFriendStatus(data?.friendStatus)
  }, [data])

  useEffect(() => {
    refetch()
  }, [friendStatus])

  const profileContents = (
    <ScrollView className='h-[100%]'>
      <View className='flex-col'>
        {data?.friendStatus == 'PENDING' && (
          <IncomingFriendAlert
            username={viewingProfileUsername}
            notifId={data.friendNotifId!}
            senderId={data.friendNotifSenderId!}
            receiverId={data.friendNotifReceiverId!}
            setFriendStatus={setFriendStatus}
          />
        )}
        <View className='flex-row'>
          <View className='mx-2 mt-2'>
            <MaterialCommunityIcons name='face-man-profile' size={80} color='#CACACA' />
          </View>
          <View className='flex-1 flex-row justify-evenly'>
            <HeaderElement field1={data?.streak} field2='Streak' />
            <HeaderElement
              field1={data?.workoutCount}
              field2={`${data?.workoutCount == 1 ? 'Workout' : 'Workouts'}`}
            />
            <HeaderElement
              field1={data?.postCount}
              field2={`${data?.postCount == 1 ? 'Post' : 'Posts'}`}
            />
          </View>
        </View>
        <Text className='mx-4 font-bold text-slate-200'>{data?.name}</Text>
        <View className='flex-row justify-between'>
          <FriendStatus friendStatus={friendStatus} />
          <MessageButton
            chatId={data?.chatId}
            type={ChatType.DIRECT}
            username={viewingProfileUsername}
            userId={viewingProfileId}
          />
        </View>
      </View>
    </ScrollView>
  )

  return (
    <SafeAreaView style={{ backgroundColor: '#1C1B1B', flex: 1 }}>
      <View className='flex-column'>
        <NavBar center={viewingProfileUsername} />
        {isLoading && <RotatingBarbellIcon />}
        {!isLoading && profileContents}
      </View>
    </SafeAreaView>
  )
}
