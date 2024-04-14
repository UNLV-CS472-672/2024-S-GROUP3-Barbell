import { Text } from "react-native";
import Activity from ".";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import { useGlobalContext } from "~/context/global-context";
import { api } from "~/utils/api";
import { ACTIVITY_FEED_ITEM_LIMIT } from "../../utils/constants";


const ActivityFeed = () => {
  let activities: any[] = [];
  const { userData } = useGlobalContext();
  const { data: friends, isLoading: friendsIsLoading } = api.user.getFriends.useQuery({ userId: userData?.id ?? 0 });
  const { data: friendsActivities, isLoading: friendsActivitiesLoading } = api.workout.getActivityFeedWorkouts
          .useQuery(
            { friendIds: friends?.map(friend => friend.friendId) ?? [], count: ACTIVITY_FEED_ITEM_LIMIT },
            { enabled: !friendsIsLoading }
          );

  if (!friendsActivitiesLoading) {
    activities = friendsActivities?.map(workout => <Activity workout={workout}></Activity>) ?? [];
  }

  return (
    <SafeAreaView className="bg-bb-slate-100 flex-1" style={{ backgroundColor: '#1e1e1e', flex: 1 }}>
      <Text className="text-3xl text-slate-200 py-4 px-2">Feed</Text>
      <FlatList
        data={activities}
        renderItem={({ item }) => (item)} />
    </SafeAreaView>
  )

}

export default ActivityFeed;