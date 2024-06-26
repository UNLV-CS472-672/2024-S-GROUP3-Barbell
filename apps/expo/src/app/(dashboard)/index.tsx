import React, { useEffect, useRef } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Route, router } from 'expo-router'

import { FontAwesome5 } from '@expo/vector-icons'

import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import PostDashboard from '~/components/post/PostDashboard'
import WorkoutTracker from '~/components/tracker/workout-tracker'
import CustomBottomSheetModal, {
  CustomBottomSheetModalRef,
} from '~/components/ui/bottom-sheet/custom-bottom-sheet-modal'
import BarbellTitle from '~/components/ui/nav-bar/BarbellTitle'
import NavBar from '~/components/ui/nav-bar/NavBar'
import DisplayWorkoutFrequencyGraph from '~/components/workout/frequency_graph'
import { useGlobalContext } from '~/context/global-context'
import ActivityFeed from '../activity/feed'

const Dashboard = () => {
  const { userData, setBottomSheetRef } = useGlobalContext()

  const bottomSheetRef = useRef<CustomBottomSheetModalRef>(null)

  useEffect(() => {
    setBottomSheetRef(bottomSheetRef)
  }, [bottomSheetRef])

  return (
    <SafeAreaView style={{ backgroundColor: '#1E1E1E', flex: 1 }}>
      {userData ? (
        <>
          <NavBar
            left={<View />}
            center={<BarbellTitle />}
            right={
              <TouchableOpacity
                testID='message-button'
                onPress={() => router.push('notif/' as Route<string>)}
              >
                <FontAwesome5 name='inbox' size={24} color='#CACACA' />
              </TouchableOpacity>
            }
          />
          <ScrollView className='flex-1'>
            <View className='mt-4 px-4'>
              <Text className='text-4xl font-semibold text-white'>
                Hello {userData?.name.split(' ')[0]}!
              </Text>
            </View>

            <View className='mt-6 gap-y-4 px-4'>
              <PostDashboard />
              <ActivityFeed />
              <DisplayWorkoutFrequencyGraph />
            </View>

            <CustomBottomSheetModal
              ref={bottomSheetRef}
              customSnapPoints={['93%']}
              startIndex={0}
              renderBackdrop
            >
              <WorkoutTracker {...{ bottomSheetRef }} />
            </CustomBottomSheetModal>
          </ScrollView>
        </>
      ) : (
        <View className='flex h-full items-center justify-center'>
          <RotatingBarbellIcon />
        </View>
      )}
    </SafeAreaView>
  )
}

export default Dashboard
