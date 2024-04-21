import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { MaterialCommunityIcons } from '@expo/vector-icons'

import NavBar from '~/components/ui/nav-bar/NavBar'
import { api } from '~/utils/trpc/api'

interface ProfileViewProps {
  userId: number
}

export default function ProfileView({ userId }: ProfileViewProps) {
  const { data } = api.user.getProfileInfoById.useQuery({ id: 1 })

  return (
    <SafeAreaView style={{ backgroundColor: '#1C1B1B', flex: 1 }}>
      <View className='flex-column'>
        <View>
          <NavBar center={data?.username?.trim()} />
          <View className='flex-row'>
            <View className='mx-2 mt-2'>
              <MaterialCommunityIcons name='face-man-profile' size={80} color='#CACACA' />
            </View>
            <View className='flex-1 flex-row justify-center'>
              <View className='items-center justify-center'>
                <Text className='text-[18px] text-slate-200'>{data?.streak}</Text>
                <Text className='text-[18px] text-slate-200'>Streak</Text>
              </View>
              <View className='mx-[10%]' />
              <View className='items-center justify-center'>
                <Text className='text-[18px] text-slate-200'>{data?.workoutCount}</Text>
                <Text className='text-[18px] text-slate-200'>Workouts</Text>
              </View>
            </View>
          </View>
          <Text className='mx-4 font-bold text-slate-200'>{data?.name}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
