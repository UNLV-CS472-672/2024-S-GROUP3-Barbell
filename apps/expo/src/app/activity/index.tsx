import { FlatList, Text, View } from 'react-native';

export interface ActivityProps {
  workout: any;
}

const Activity: React.FC<ActivityProps> = ({ workout }) => {
  const formatDate = (date: Date) => date.toLocaleDateString();

  return (
    <View className="m-3 p-4 bg-bb-dark-gray text-bb-slate-100 rounded-lg">
      <View className="flex-row justify-between items-baseline">
        <Text className="text-2xl text-slate-200">{workout.user.name}</Text>
        <Text className="text-lg text-slate-200">{formatDate(workout.finishedAt)}</Text>
      </View>
      <View className="flex-row justify-between items-baseline">
        <Text className="text-lg my-2 text-slate-200">{workout.name}</Text>
      </View>
      <Text className="my-1 text-slate-200">{workout.description}</Text>
      <View className="flex-row my-1 flex-wrap">
        <Text className="text-slate-200">Exercises:</Text>
        <FlatList data={workout.exercises} renderItem={({ item }) => (
          <Text className="mx-3 text-slate-200">{item.name}</Text>
        )} />
      </View>
    </View>
  )
};

export default Activity;