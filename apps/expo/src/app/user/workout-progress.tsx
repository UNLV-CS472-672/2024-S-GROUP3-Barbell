import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const WorkoutProgress = () => {
  return (
    <SafeAreaView>
      <Text style={ { textAlign: 'center', padding: 30 }}>
        Workout progress!
      </Text>
    </SafeAreaView>
  )
}

export default WorkoutProgress;

