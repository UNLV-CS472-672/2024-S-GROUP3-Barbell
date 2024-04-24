import { Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import Activity from '~/components/feed/activity'
import { useGlobalContext } from '~/context/global-context'
import { ACTIVITY_FEED_ITEM_LIMIT } from '~/utils/constants'
import { api } from '~/utils/trpc/api'

const ActivityFeed = () => {
  let activities: any[] = []
  const { userData } = useGlobalContext()

  const { data: friends, isLoading: friendsIsLoading } =
    api.friend.getFriendsWithChatIdFromUserId.useQuery({
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
    <SafeAreaView
      className='bg-bb-slate-100 flex-1'
      style={{ backgroundColor: '#1e1e1e', flex: 1 }}
    >
      <Text className='px-2 py-4 text-3xl text-slate-200'>Friend Activities</Text>
      <FlatList data={activities} renderItem={({ item }) => item} />
    </SafeAreaView>
  )
}

export default ActivityFeed
