import { Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import Activity from '~/components/feed/activity'
import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import Label from '~/components/ui/label/Label'
import { useGlobalContext } from '~/context/global-context'
import { ACTIVITY_FEED_ITEM_LIMIT } from '~/utils/constants'
import { api } from '~/utils/trpc/api'

const ActivityFeed = () => {
  let activities: any[] = []
  const { userData } = useGlobalContext()

  const { data: friends, isLoading: friendsIsLoading } = api.friend.getFriendsFromUserId.useQuery({
    id: userData?.id ?? 0,
  })

  const { data: friendsWorkoutLogs, isLoading: friendsActivitiesLoading } =
    api.workoutLog.getActivityFeedWorkouts.useQuery(
      {
        friendIds: friends?.map((friend) => friend.id) ?? [],
        count: ACTIVITY_FEED_ITEM_LIMIT,
      },
      { enabled: !friendsIsLoading },
    )

  if (!friendsActivitiesLoading) {
    activities =
      friendsWorkoutLogs?.map((workoutLog) => {
        return (
          <Activity
            user={workoutLog.user}
            workout={workoutLog.workoutTemplate}
            workoutLog={workoutLog}
          ></Activity>
        )
      }) ?? []
  }

  return (
    <View className='bg-dark-purple h-96 rounded-xl'>
      <View className='p-2'>
        <Label text='Friend Activities' textColor='white' backgroundColor='#34344F' />
      </View>
      {friendsIsLoading || friendsActivitiesLoading ? (
        <View className='flex h-[70%] items-center justify-center'>
          <RotatingBarbellIcon />
        </View>
      ) : (
        <FlatList data={activities} renderItem={({ item }) => item} />
      )}
    </View>
  )
}

export default ActivityFeed
