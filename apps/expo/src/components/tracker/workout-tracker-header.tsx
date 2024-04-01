import { Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Button from '~/components/ui/button/button'
import { CustomBottomSheetModalRef } from '~/components/ui/custom-bottom-sheet-modal'
import { useGlobalContext } from '~/context/global-context'
import WorkoutTimer from './workout-timer'

export interface IWorkoutTrackerHeaderProps {
  bottomSheetRef: React.RefObject<CustomBottomSheetModalRef>
}

const WorkoutTrackerHeader: React.FC<IWorkoutTrackerHeaderProps> = ({
  bottomSheetRef,
}) => {
  const { setIsWorkingOut } = useGlobalContext()

  const handleCancelWorkout = () => {
    setIsWorkingOut(false)
    bottomSheetRef.current?.dismiss()
  }

  return (
    <View className="mx-2">
      <View className="mt-2 flex flex-row items-center justify-between">
        {/* TODO: Implement Rest Timer Component functionality */}
        <Button color="dark" size="icon" className="p-2">
          <MaterialCommunityIcons
            name="camera-timer"
            size={24}
            color="#CACACA"
          />
        </Button>
        <View className="flex flex-row justify-end gap-x-4">
          <Button
            className="bg-[#9D534F] px-6 opacity-90"
            onPress={() => handleCancelWorkout()}
          >
            <Text className="font-bold text-white">Cancel</Text>
          </Button>
          <Button className="bg-[#55A181] px-12">
            <Text className="font-bold text-white">Finish</Text>
          </Button>
        </View>
      </View>
      {/* TODO: Replace this text with an input component */}
      <Text className="font-koulen mt-6 text-3xl leading-tight tracking-widest text-slate-200">
        Afternoon Workout
      </Text>
      {/* TODO: Add a ... button with extra options */}
      <WorkoutTimer />
    </View>
  )
}

export default WorkoutTrackerHeader
