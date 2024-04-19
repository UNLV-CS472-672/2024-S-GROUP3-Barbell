import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { CustomBottomSheetModalRef } from '^/apps/expo/src/components/ui/bottom-sheet/custom-bottom-sheet-modal'
import { ExerciseSchema } from '^/packages/validators/src'
import { z } from 'zod'

import ExerciseEntry from '~/components/tracker/exercise-entry'
import WorkoutTrackerHeader from '~/components/tracker/workout-tracker-header'
import Button from '~/components/ui/button/button'
import { api } from '~/utils/trpc/api'
import { extractExerciseData, extractWorkoutName } from '~/utils/workoutApiReponseExtractor'
import RotatingBarbellIcon from '../notif/RotatingBarbellIcon'

export type TExercise = z.infer<typeof ExerciseSchema>

export interface IWorkoutTrackerProps {
  bottomSheetRef: React.RefObject<CustomBottomSheetModalRef>
  workoutTemplateId: number
}

const WorkoutTracker: React.FC<IWorkoutTrackerProps> = ({ bottomSheetRef, workoutTemplateId }) => {
  const { data, isFetching } = api.workoutTemplate.getWorkoutTemplateInfoById.useQuery({
    id: workoutTemplateId,
  })

  const [exercises, setExercises] = useState<TExercise[]>([])
  const [workoutName, setWorkoutName] = useState('')

  useEffect(() => {
    console.log(data)
    setExercises(extractExerciseData(data))
    setWorkoutName(extractWorkoutName(data))
  }, [data])

  // TODO: Fix the keyboard avoid view with the inputs
  return (
    <View>
      {isFetching ? (
        <View className='flex h-[90%] items-center justify-center'>
          <RotatingBarbellIcon size={46} />
        </View>
      ) : (
        <>
          <WorkoutTrackerHeader {...{ bottomSheetRef, workoutName, setWorkoutName, exercises }} />

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
