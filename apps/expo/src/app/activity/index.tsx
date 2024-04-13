import { Text, View } from 'react-native';
import { WorkoutZod } from '^/packages/validators/src';

interface ActivityProps {
  workout: any;
}

const Activity: React.FC<ActivityProps> = ({ workout }) => {
  return (
    <View className="m-3 p-4 bg-bb-dark-gray text-bb-slate-100 rounded-lg">
      <View className="flex-row justify-between items-baseline">
        <Text className="text-2xl text-slate-200">User Name</Text>
        <Text className="text-lg text-slate-200">{workout.id}</Text>
      </View>
      <View className="flex-row justify-between items-baseline">
        <Text className="text-lg my-2 text-slate-200">Name of workout</Text>
        <Text className="text-xl text-slate-200">23 ❤</Text>
      </View>
      <Text className="my-1 text-slate-200">Description of the workout maybe it's kinda long</Text>
      <View className="flex-row my-1 flex-wrap">
        <Text className="text-slate-200">Exercises:</Text>
        <Text className="mx-3 text-slate-200">9999x Shrugs</Text>
        <Text className="mx-3 text-slate-200">1x Push-ups</Text>
        <Text className="mx-3 text-slate-200">9999x Double takes</Text>
      </View>
    </View>
  )
};

export default Activity;