import { Text, TextInput, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import { CustomBottomSheetModalRef } from '^/apps/expo/src/components/ui/bottom-sheet/custom-bottom-sheet-modal'

import WorkoutTimer from '~/components/tracker/workout-timer'
import { TExercise } from '~/components/tracker/workout-tracker'
import Button from '~/components/ui/button/button'
import { useGlobalContext } from '~/context/global-context'
import colors from '~/styles/colors'

export interface IWorkoutTrackerHeaderProps {
  bottomSheetRef: React.RefObject<CustomBottomSheetModalRef>
  workoutName: string
  setWorkoutName: React.Dispatch<React.SetStateAction<string>>
  exercises: TExercise[]
}

const WorkoutTrackerHeader: React.FC<IWorkoutTrackerHeaderProps> = ({
  bottomSheetRef,
  workoutName,
  setWorkoutName,
}) => {
  const { setIsWorkingOut } = useGlobalContext()

  const handleCancelWorkout = () => {
    setIsWorkingOut(false)
    bottomSheetRef.current?.dismiss()
  }

  return (
    <View className='mx-2'>
      <View className='mt-2 flex flex-row items-center justify-between'>
        {/* TODO: Implement Rest Timer Component functionality */}
        <Button color='dark' size='icon' className='p-3'>
          <Ionicons name='timer-outline' size={26} color={colors.bottomav.icon} />
        </Button>
        <View className='flex flex-row justify-end gap-x-4'>
          <Button className='bg-light-red px-6 opacity-90' onPress={handleCancelWorkout}>
            <Text className='font-bold text-white'>Cancel</Text>
          </Button>
          <Button className='bg-light-green px-12' onPress={() => {}}>
            <Text className='font-bold text-white'>Finish</Text>
          </Button>
        </View>
      </View>
      <TextInput
        placeholder='Workout Name'
        onChangeText={setWorkoutName}
        value={workoutName}
        className='font-koulen justify-center py-2 text-3xl text-slate-200' // FIXME: Styling issues with placeholder and koulen
        multiline
      />

      {/* TODO: Add a ... button with extra options */}
      <WorkoutTimer />
    </View>
  )
}

export default WorkoutTrackerHeader
