import { useState } from 'react'
import { Text, TextInput, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import { CustomBottomSheetModalRef } from '^/apps/expo/src/components/ui/bottom-sheet/custom-bottom-sheet-modal'

import WorkoutTimer from '~/components/tracker/workout-timer'
import { TExercise } from '~/components/tracker/workout-tracker'
import Button from '~/components/ui/button/button'
import { useGlobalContext } from '~/context/global-context'
import colors from '~/styles/colors'
import { api } from '~/utils/trpc/api'
import {
  areTemplatesDifferent,
  prepareExercisesForApi,
  TWorkoutTemplateInfo,
} from '~/utils/workout-tracker-utils'
import PickerModal from '../ui/picker-modal/picker-modal'

export interface IWorkoutTrackerHeaderProps {
  bottomSheetRef: React.RefObject<CustomBottomSheetModalRef>
  workoutName: string
  setWorkoutName: React.Dispatch<React.SetStateAction<string>>
  exercises: TExercise[]
  workoutTemplate: TWorkoutTemplateInfo | null
}

const WorkoutTrackerHeader: React.FC<IWorkoutTrackerHeaderProps> = ({
  bottomSheetRef,
  workoutName,
  setWorkoutName,
  exercises,
  workoutTemplate,
}) => {
  const { setIsWorkingOut, userData } = useGlobalContext()
  const [time, setTime] = useState(0)
  const [isDifferentWorkoutModalVisible, setIsDifferentWorkoutModalVisible] = useState(false)
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false)

  const createNewWorkoutLog = api.workoutLog.createNewWorkoutLog.useMutation()
  const createNewWorkoutLogAndUpdateValues =
    api.workoutLog.createNewWorkoutLogAndUpdateValues.useMutation()

  const handleCancelWorkout = () => {
    setIsWorkingOut(false)
    bottomSheetRef.current?.dismiss()
  }

  const handleFinishWorkout = () => {
    exercises = prepareExercisesForApi(exercises)
    console.log('filtered exercises', exercises)

    if (!exercises.length) {
      setIsErrorModalVisible(true)
      return
    }

    if (areTemplatesDifferent(workoutTemplate, workoutName, exercises)) {
      createNewWorkoutLogAndUpdateValues.mutate({
        duration: time,
        userId: userData!.id,
        workoutData: {
          workoutTemplateId: workoutTemplate!.workoutTemplateId,
          workoutName,
          exercises,
        },
      })
      console.log('Different')
      setIsDifferentWorkoutModalVisible(true)
      return
    }

    createNewWorkoutLog.mutate({
      duration: time,
      userId: userData!.id,
      workoutTemplateId: workoutTemplate!.workoutTemplateId,
    })
    setIsWorkingOut(false)
    bottomSheetRef.current?.dismiss()

    console.log('Same')
  }

  return (
    <>
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
            <Button className='bg-light-green px-12' onPress={handleFinishWorkout}>
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
        <WorkoutTimer {...{ time, setTime }} />
      </View>

      <PickerModal
        title='Your finished workout is different from the template. What would you like to do?'
        data={[
          'Create new workout template',
          'Update existing workout template',
          'Discard changes',
          'Cancel',
        ]}
        isVisible={isDifferentWorkoutModalVisible}
        onPress={() => {
          setIsDifferentWorkoutModalVisible(false)
        }}
        onCancelPress={() => {
          setIsDifferentWorkoutModalVisible(false)
        }}
        onBackdropPress={() => {
          setIsDifferentWorkoutModalVisible(false)
        }}
      />

      <PickerModal
        title='Your workout is empty. Would you like to cancel it?'
        data={['Yes, cancel workout', 'No, continue workout']}
        isVisible={isErrorModalVisible}
        onPress={() => {
          setIsErrorModalVisible(false)
        }}
        onCancelPress={() => {
          setIsErrorModalVisible(false)
        }}
        onBackdropPress={() => {
          setIsErrorModalVisible(false)
        }}
      />
    </>
  )
}

export default WorkoutTrackerHeader
