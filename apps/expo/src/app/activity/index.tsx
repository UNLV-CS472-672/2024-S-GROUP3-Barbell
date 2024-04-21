import { FlatList, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export interface ActivityProps {
  workout: any;
  user: any;
  workoutLog: any;
}

const Activity: React.FC<ActivityProps> = ({ user, workout, workoutLog }) => {
  const formatDate = (date: Date) => date.toLocaleDateString();

  return (
    <View className="mx-3 p-3 text-bb-slate-100" style={{ borderBottomWidth: 1, borderBottomColor: '#737272' }}>
      <View className="flex-row justify-between items-baseline">
        <Text className="text-2xl mb-1 font-bold text-slate-200">{user.name}</Text>
        <Text className="text-lg text-slate-200">{formatDate(workoutLog.createdAt)}</Text>
      </View>
      <View className="flex-row justify-between items-baseline">
        <Text className="text-lg m-2 text-slate-200">{workout.name}</Text>
      </View>
      <Text className="m-2 text-slate-200">{workout.description}</Text>
      <View className="flex-row my-3">
        <View className="flex-1">
          <Text className="text-slate-200">Exercises:</Text>
          <FlatList data={workout.exercises} renderItem={({ item }) => (
            <Text className="mx-3 text-slate-200">{item.name}</Text>
          )} />
        </View>
        <View className="flex-row items-end justify-items-end">
          <MaterialCommunityIcons name="dumbbell" size={20} color="#48476D" />
        </View>
      </View>
    </View>
  )
};

export default Activity;