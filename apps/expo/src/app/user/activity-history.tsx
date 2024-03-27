import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ActivityHistory = () => {
  return (
    <SafeAreaView>
      <Text style={ { textAlign: 'center', padding: 30 }}>
        Activity history!
      </Text>
    </SafeAreaView>
  )
}

export default ActivityHistory;

