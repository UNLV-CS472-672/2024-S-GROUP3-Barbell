import { useState } from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { BodyPart, Category } from '@prisma/client'
import { CustomBottomSheetModalRef } from '^/apps/expo/src/components/ui/bottom-sheet/custom-bottom-sheet-modal'
import { ExerciseSchema } from '^/packages/validators/src'
import { z } from 'zod'

import ExerciseEntry from '~/components/tracker/exercise-entry'
import WorkoutTrackerHeader from '~/components/tracker/workout-tracker-header'
import Button from '~/components/ui/button/button'

export type TExercise = z.infer<typeof ExerciseSchema>

export interface IWorkoutTrackerProps {
  bottomSheetRef: React.RefObject<CustomBottomSheetModalRef>
}

// TODO: Remove mock data
const exerciseData = [
  {
    id: 1,
    name: 'Bench Press',
    bodyPart: BodyPart.CHEST,
    category: Category.BARBELL,
    sets: [],
  },
  {
    id: 2,
    name: 'Squat',
    bodyPart: BodyPart.LEGS,
    category: Category.BARBELL,
    sets: [],
    note: 'This is a note for the squat exercise.',
  },
  {
    id: 3,
    name: 'Deadlift',
    bodyPart: BodyPart.BACK,
    category: Category.BARBELL,
    sets: [],
  },
]

const WorkoutTracker: React.FC<IWorkoutTrackerProps> = ({ bottomSheetRef }) => {
  const [exercises, setExercises] = useState<TExercise[]>(exerciseData)
  const [workoutName, setWorkoutName] = useState('New Workout') // TODO: Set the default value to the previous workout name

  // TODO: Fix the keyboard avoid view with the inputs
  return (
    <View>
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
    </View>
  )
}

export default WorkoutTracker
