import { Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

const SetEntryHeader: React.FC = () => {
  return (
    <View className="mb-2 flex flex-row items-center justify-between px-2">
      <View className="basis-14">
        <Text className="text-center font-bold text-slate-200">Set</Text>
      </View>
      <View className="basis-20">
        <Text className="text-center font-bold text-slate-200">Unilateral</Text>
      </View>
      <View className="basis-20">
        <Text className="text-center font-bold text-slate-200">lbs</Text>
      </View>
      <View className="basis-20">
        <Text className="text-center font-bold text-slate-200">Reps</Text>
      </View>
      <View className="basis-12">
        <Feather
          name="check"
          size={20}
          color="#CACACA"
          className="text-center"
        />
      </View>
    </View>
  )
}

export default SetEntryHeader
