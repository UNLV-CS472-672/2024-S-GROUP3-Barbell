import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { router } from 'expo-router'

import { produce } from 'immer'
import { z } from 'zod'

import { ExerciseSchema } from '@acme/validators'

import type { TWorkoutTemplateInfo } from '~/utils/workout-tracker-utils'
import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import ExerciseEntry from '~/components/tracker/exercise-entry'
import WorkoutTrackerHeader from '~/components/tracker/workout-tracker-header'
import { CustomBottomSheetModalRef } from '~/components/ui/bottom-sheet/custom-bottom-sheet-modal'
import Button from '~/components/ui/button/button'
import { useGlobalContext } from '~/context/global-context'
import { api } from '~/utils/trpc/api'
import {
  extractExerciseData,
  extractWorkoutName,
  extractWorkoutTemplate,
} from '~/utils/workout-tracker-utils'

export type TExercise = z.infer<typeof ExerciseSchema>

export interface IWorkoutTrackerProps {
  bottomSheetRef: React.RefObject<CustomBottomSheetModalRef>
}

const WorkoutTracker: React.FC<IWorkoutTrackerProps> = ({ bottomSheetRef }) => {
  const { workoutTemplateId, selectedExercises } = useGlobalContext()

  // selected exercises
  const {
    data: selectedExercisesData,
    isFetching: exercisesIsFetching,
    isFetched: exercisesIsFetched,
    refetch,
  } = api.exercise.getExercisesFromExerciseIdArray.useQuery({
    ids: selectedExercises,
  })

  // workout template exercises
  const {
    data: workoutTemplateExercises,
    isFetching,
    isFetched,
  } = api.workoutTemplate.getWorkoutTemplateInfoById.useQuery({
    id: workoutTemplateId!,
  })

  const [workoutTemplate, setWorkoutTemplate] = useState<TWorkoutTemplateInfo | null>(null)
  const [exercises, setExercises] = useState<TExercise[]>([])
  const [workoutName, setWorkoutName] = useState('')

  console.log(workoutTemplateExercises)

  useEffect(() => {
    setWorkoutTemplate(extractWorkoutTemplate(workoutTemplateExercises))
    setWorkoutName(extractWorkoutName(workoutTemplateExercises))

    setExercises(
      produce((draft) => {
        return [...extractExerciseData(workoutTemplateExercises), ...(selectedExercisesData ?? [])]
      }),
    )
  }, [workoutTemplateExercises])

  // TODO: Move note attribute to exerciseLog schema

  // TODO: Fix the keyboard avoid view with the inputs
  return (
    <View className='flex-1 pb-10'>
      {isFetching || exercisesIsFetching ? (
        <View className='flex h-[90%] items-center justify-center'>
          <RotatingBarbellIcon size={46} />
        </View>
      ) : (
        <>
          <WorkoutTrackerHeader
            {...{ bottomSheetRef, workoutName, setWorkoutName, exercises, workoutTemplate }}
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
              <Text className='py-1 text-center font-bold text-white'>Add Exercises</Text>
            </Button>
          </ScrollView>
        </>
      )}
    </View>
  )
}

export default WorkoutTracker
