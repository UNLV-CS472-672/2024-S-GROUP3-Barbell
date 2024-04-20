import { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { Route, router } from 'expo-router'

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
  const [isNormalModalVisible, setIsNormalModalVisible] = useState(false)
  const [isDifferentWorkoutModalVisible, setIsDifferentWorkoutModalVisible] = useState(false)
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false)
  const apiUtils = api.useUtils()

  const createNewWorkoutLog = api.workoutLog.createNewWorkoutLog.useMutation({
    onSuccess: () => {
      apiUtils.user.getUserWorkoutHistory.invalidate() // workout completion needs to grab most recent workoutLog data
    },
  })

  const createNewWorkoutLogAndUpdateValues =
    api.workoutLog.createNewWorkoutLogAndUpdateValues.useMutation({
      onSuccess: () => {
        apiUtils.workoutTemplate.invalidate() // workoutTemplate needs to grab most recent exerciseLog data
        apiUtils.user.getUserWorkoutHistory.invalidate()
      },
    })

  const handleCancelWorkout = () => {
    setIsWorkingOut(false)
    bottomSheetRef.current?.dismiss()
  }

  const sendUserToWorkoutCompletion = () => {
    bottomSheetRef.current?.dismiss()
    setIsWorkingOut(false)
    router.push({
      pathname: '/workout-completion' as Route<string>,
      params: {
        workoutName,
        exercises: JSON.stringify(exercises),
        duration: time,
        dateFinished: new Date().toDateString(),
      },
    })
  }

  const handleFinishWorkout = () => {
    exercises = prepareExercisesForApi(exercises)

    if (!exercises.length) {
      setIsErrorModalVisible(true)
      return
    }
    if (areTemplatesDifferent(workoutTemplate, workoutName, exercises)) {
      setIsDifferentWorkoutModalVisible(true)
      return
    }

    setIsNormalModalVisible(true)
  }

  const handleUpdateValuesOnly = () => {
    createNewWorkoutLogAndUpdateValues.mutate({
      duration: time,
      userId: userData!.id,
      workoutData: {
        workoutTemplateId: workoutTemplate!.workoutTemplateId,
        workoutName,
        exercises,
      },
    })
    setIsDifferentWorkoutModalVisible(false)
    sendUserToWorkoutCompletion()
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
        title='Update Template'
        subTitle='Your workout template has been modified. What would you like to do?'
        isVisible={isDifferentWorkoutModalVisible}
        onBackdropPress={() => {
          setIsDifferentWorkoutModalVisible(false)
        }}
      >
        <View className='gap-y-3 px-4 py-4'>
          <Button onPress={handleUpdateValuesOnly}>
            <Text className='text-center font-semibold text-white'>Update Values Only</Text>

            {/* // TODO: Implement this */}
            {/* <Text className='text-center text-white'>{`Update values for ${2} set`}</Text> */}
          </Button>

          {/* TODO: implement this */}
          {/* <Button className='bg-light-red'>
            <Text className='text-center font-semibold text-white'>Update Template</Text>
            <Text className='text-center text-white'>Add 2 exercises</Text>
          </Button> */}

          <Button
            color='dark'
            onPress={() => {
              setIsDifferentWorkoutModalVisible(false)
              sendUserToWorkoutCompletion()
              createNewWorkoutLog.mutate({
                duration: time,
                userId: userData!.id,
                workoutTemplateId: workoutTemplate!.workoutTemplateId,
              })
            }}
          >
            <Text className='py-1 text-center font-semibold text-white'>
              Keep Original Template
            </Text>
          </Button>
        </View>
      </PickerModal>

      <PickerModal
        title='Your workout is empty. Would you like to cancel it?'
        isVisible={isErrorModalVisible}
        onBackdropPress={() => {
          setIsErrorModalVisible(false)
        }}
      >
        <View className='gap-y-4 px-6 pb-4'>
          <Button
            value='Continue Workout'
            color='dark'
            className='py-4'
            onPress={() => {
              setIsErrorModalVisible(false)
            }}
          />
          <Button
            className='bg-light-red py-4'
            value='Cancel Workout'
            onPress={() => {
              bottomSheetRef.current?.dismiss()
              setIsErrorModalVisible(false)
              setIsWorkingOut(false)
            }}
          />
        </View>
      </PickerModal>

      <PickerModal
        title='Finish workout?'
        isVisible={isNormalModalVisible}
        onBackdropPress={() => {
          setIsNormalModalVisible(false)
        }}
      >
        <View className='gap-y-4 px-6 pb-4'>
          <Button
            className='bg-light-green py-4'
            onPress={() => {
              setIsNormalModalVisible(false)
              sendUserToWorkoutCompletion()
              createNewWorkoutLog.mutate({
                duration: time,
                userId: userData!.id,
                workoutTemplateId: workoutTemplate!.workoutTemplateId,
              })
            }}
          >
            <Text className='text-center font-semibold text-white'>Finish workout</Text>
          </Button>
          <Button
            className='py-4'
            color='dark'
            value='Cancel'
            onPress={() => {
              setIsNormalModalVisible(false)
            }}
          />
        </View>
      </PickerModal>
    </>
  )
}

export default WorkoutTrackerHeader
