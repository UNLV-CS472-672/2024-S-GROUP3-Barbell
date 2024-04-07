import { Switch, TextInput, View } from 'react-native'

import { Feather } from '@expo/vector-icons'

import Button from '~/components/ui/button/button'

const SetEntry: React.FC = () => {
  return (
    <View className="flex flex-row items-center justify-between px-2">
      <View className="flex basis-14 flex-row justify-start py-1" testID="set-type-button-container">
        <Button value="W" className="h-9 w-full" color="dark" />
      </View>
      <View className="flex basis-24 items-center py-1" testID="unilateral-switch-container">
        <Switch className="h-9" />
      </View>
      <View className="basis-20 py-1" testID="weight-input-container">
        <TextInput className="h-9 rounded-lg bg-slate-900 text-center text-white" />
      </View>
      <View className="basis-20 py-1" testID="reps-input-container">
        <TextInput className="h-9 rounded-lg bg-slate-900 text-center text-white" />
      </View>
      <View className="basis-12 py-1" testID="completed-button-container">
        <Button className="flex h-9 items-center justify-center" color="dark">
          <Feather name="check" color="white" size={19} />
        </Button>
      </View>
    </View>
  )
}

export default SetEntry
