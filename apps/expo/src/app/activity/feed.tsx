import { Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import Activity from '~/components/feed/activity'
import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import Label from '~/components/ui/label/Label'
import { useGlobalContext } from '~/context/global-context'
import { ACTIVITY_FEED_ITEM_LIMIT } from '~/utils/constants'
import { api } from '~/utils/trpc/api'

const ActivityFeed = () => {
  const { userData } = useGlobalContext()

  const { data: friends, isLoading: friendsIsLoading } = api.friend.getFriendsFromUserId.useQuery({
    id: userData?.id ?? 0,

  })

  const {
    data: friendsWorkoutLogs,
    isFetching: friendsActivitiesLoading,
    isFetched: friendsActivitiesFetched,
  } = api.workoutLog.getActivityFeedWorkouts.useQuery(
    {
      friendIds: friends?.map((friend) => friend.id) ?? [],
      count: ACTIVITY_FEED_ITEM_LIMIT,
    },
    { enabled: !friendsIsLoading },
  )

  const activities = friendsWorkoutLogs?.map((activity) => (
    <View key={activity.id} className='py-2'>
      <Text className='text-[16px] font-bold text-white'>{activity.user.username.trim()}</Text>
      <Text className='text-white' numberOfLines={1}>
        {'Finished ' + activity.workoutTemplate.name}
      </Text>
    </View>
  ))

  const noActivityFoundText = (
    <View className='mb-8 pt-4'>
      <Text testID='no-posts-test' className='color-white text-center'>
        No friend activity to display.
      </Text>
    </View>
  )

  return (
    <View style={{ backgroundColor: '#747474' }} className='rounded-2xl'>
      <View className='p-2'>
        <Label text='Friend Activity' textColor='white' backgroundColor='#535353' />
        {friendsWorkoutLogs && activities}
        {friendsWorkoutLogs?.length == 0 && noActivityFoundText}
        {friendsActivitiesLoading && <RotatingBarbellIcon />}
      </View>
    </View>
  )
}

export default ActivityFeed
