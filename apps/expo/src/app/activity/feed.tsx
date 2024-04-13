import { Text } from "react-native";
import Activity from ".";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import { useGlobalContext } from "~/context/global-context";
import { api } from "~/utils/api";


const ActivityFeed = () => {
  const { userData } = useGlobalContext();
  const { data: friends } = api.user.getFriends.useQuery({ userId: userData?.id ?? 0 });
  const { data: friendsActivities } = api.workout.getActivityFeedWorkouts
                              .useQuery({
                                userId: userData?.id ?? 0,
                                friendIds: friends?.map(friend => friend.friendId) ?? []
                              });
  const activities = friendsActivities?.map(workout => <Activity workout={workout}></Activity>) ?? [];

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