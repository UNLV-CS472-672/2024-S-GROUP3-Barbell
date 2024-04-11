import { Text, View } from "react-native";
import Activity from ".";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";

const ActivityFeed = () => {
  const items = [0,1,2,3,4,5,6,7,8,9];
  return (
    <SafeAreaView className="bg-bb-slate-100 flex-1" style={{ backgroundColor: '#1e1e1e', flex: 1 }}>
        <Text className="text-3xl text-slate-200 py-4 px-2">Feed</Text>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <Activity></Activity>
          )}
        />
    </SafeAreaView>
  )

}

export default ActivityFeed;