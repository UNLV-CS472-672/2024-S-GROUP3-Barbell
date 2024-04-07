import { Text, View } from 'react-native'

import SetEntry from '~/components/tracker/set-entry'
import SetEntryHeader from '~/components/tracker/set-entry-header'
import Button from '~/components/ui/button/button'

const ExerciseEntry: React.FC = () => {
  return (
    <View className="mt-2">
      <Text className="mb-2 px-2 text-2xl font-semibold text-[#7B7FF3]">
        Bench Press
      </Text>
      <SetEntryHeader />
      <SetEntry />
      <Button value="Add Set" color="dark" className="mx-2 mt-2" />
    </View>
  )
}

export default ExerciseEntry
