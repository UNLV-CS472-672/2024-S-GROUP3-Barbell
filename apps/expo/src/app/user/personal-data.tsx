import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PersonalData = () => {
  return (
    <SafeAreaView>
      <Text style={ { textAlign: 'center', padding: 30 }}>
        Personal data!
      </Text>
    </SafeAreaView>
  )
}

export default PersonalData;
