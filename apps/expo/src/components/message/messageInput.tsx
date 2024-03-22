import { Button, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function MessageInput() {
  return (
    <SafeAreaView>
      <View className="mx-5 rounded-full bg-gray-500 px-5 py-5">
        <Text className="text-white">Message...</Text>

        {/* send button */}
        <View className="absolute right-2 top-2">
          <View className="bg-dark-purple h-11 w-12 rounded-full">
            <Button title=">" onPress={() => console.log('clicked')} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
