import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { CustomBottomSheetModalRef } from '^/apps/expo/src/components/ui/bottom-sheet/custom-bottom-sheet-modal'
import { ExerciseSchema } from '^/packages/validators/src'
import { z } from 'zod'

import type { TWorkoutTemplateInfo } from '~/utils/workout-tracker-utils'
import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import ExerciseEntry from '~/components/tracker/exercise-entry'
import WorkoutTrackerHeader from '~/components/tracker/workout-tracker-header'
import Button from '~/components/ui/button/button'
import { api } from '~/utils/trpc/api'
import {
  areTemplatesDifferent,
  extractExerciseData,
  extractWorkoutName,
  extractWorkoutTemplate,
} from '~/utils/workout-tracker-utils'

export type TExercise = z.infer<typeof ExerciseSchema>

export interface IWorkoutTrackerProps {
  bottomSheetRef: React.RefObject<CustomBottomSheetModalRef>
  workoutTemplateId: number
}

// TODO: Fix exercise ids to exercise in schema workoutTemplate

const WorkoutTracker: React.FC<IWorkoutTrackerProps> = ({ bottomSheetRef, workoutTemplateId }) => {
  const { data, isFetching } = api.workoutTemplate.getWorkoutTemplateInfoById.useQuery({
    id: workoutTemplateId,
  })

  const [workoutTemplate, setWorkoutTemplate] = useState<TWorkoutTemplateInfo | null>(null)
  const [exercises, setExercises] = useState<TExercise[]>([])
  const [workoutName, setWorkoutName] = useState('')

  useEffect(() => {
    console.log(data)
    setWorkoutTemplate(extractWorkoutTemplate(data))
    setExercises(extractExerciseData(data))
    setWorkoutName(extractWorkoutName(data))
  }, [data])

  const handleFinishWorkout = () => {
    if (areTemplatesDifferent(workoutTemplate, workoutName, exercises)) {
      console.log('Different')
    } else {
      console.log('Same')
    }
  }

  // TODO: Move note attribute to exerciseLog schema

  // TODO: Fix the keyboard avoid view with the inputs
  return (
    <View>
      {isFetching ? (
        <View className='flex h-[90%] items-center justify-center'>
          <RotatingBarbellIcon size={46} />
        </View>
      ) : (
        <>
          <WorkoutTrackerHeader
            {...{ bottomSheetRef, workoutName, setWorkoutName, exercises, handleFinishWorkout }}
          />

          <ScrollView>
            {exercises.map((exercise, exerciseIndex) => (
              <ExerciseEntry
                key={exercise.id}
                {...{ exercise, exerciseIndex }}
                workoutUpdater={setExercises}
              />
            ))}

            {/* TODO: Implement this */}
            <Button className='mx-2 mt-8'>
              <Text className='text-center font-bold text-white'>Add Exercises</Text>
            </Button>
          </ScrollView>
        </>
      )}
    </View>
  )
}

export default WorkoutTracker
