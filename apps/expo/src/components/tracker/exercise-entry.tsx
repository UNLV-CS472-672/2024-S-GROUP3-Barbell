import { memo, useCallback, useEffect } from 'react'
import { NativeSyntheticEvent, Text, TextInput, TextInputChangeEventData, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import { SetType } from '@prisma/client'
import { produce } from 'immer'
import { v4 as uuid } from 'uuid'

import type { TExercise } from '~/components/tracker/workout-tracker'
import SetEntry from '~/components/tracker/set-entry'
import SetEntryHeader from '~/components/tracker/set-entry-header'
import Button from '~/components/ui/button/button'

export interface IExerciseEntryProps {
  exercise: TExercise
  exerciseIndex: number
  workoutUpdater: React.Dispatch<React.SetStateAction<TExercise[]>>
}

const ExerciseEntry: React.FC<IExerciseEntryProps> = memo(
  ({ exercise, exerciseIndex, workoutUpdater }) => {
    const handleEmptySet = useCallback(() => {
      workoutUpdater(
        produce((draft) => {
          draft[exerciseIndex]!.sets.push({
            id: uuid(),
            type: SetType.NORMAL,
            exerciseId: exercise.id,
            reps: [] as number[],
            weight: [] as number[],
            unilateral: false,
          })
        }),
      )
    }, [])

    useEffect(() => {
      console.log('ExerciseEntry useEffect')
      const { sets } = exercise
      // If there doesn't exists a set from a previous workout, then we start this new exercise with one default set
      if (sets.length === 0) {
        console.log('adding default set')
        handleEmptySet()
      }
    }, [])

    const handleNoteInputChange = useCallback(
      (value: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const val = value.nativeEvent.text
        workoutUpdater(
          produce((draft) => {
            draft[exerciseIndex]!.note = val
          }),
        )
      },
      [],
    )

    const handleAddSet = useCallback(() => {
      workoutUpdater(
        produce((draft) => {
          draft[exerciseIndex]?.sets.push({
            id: uuid(),
            type: SetType.NORMAL,
            exerciseId: exercise.id,
            reps: [] as number[],
            weight: [] as number[],
            unilateral: false,
          })
        }),
      )
    }, [])

    return (
      <View className='mb-2 mt-3'>
        <Text className='mb-2 px-2 text-2xl font-semibold text-[#7B7FF3]'>{exercise.name}</Text>
        <SetEntryHeader />
        <View
          className={`mx-2 mb-1 flex flex-row items-center gap-x-2 rounded-lg px-2 py-1 opacity-70 
          ${exercise.note ? 'bg-dark-purple' : 'border-b  border-slate-200'}`}
        >
          <View className='flex justify-center'>
            <Ionicons name='pencil' size={16} color='white' />
          </View>
          <TextInput
            className='flex-1 text-white placeholder:text-slate-200'
            value={exercise.note}
            onChange={handleNoteInputChange}
            multiline
            placeholder='Add a note...'
          />
        </View>
        <View className='gap-y-1'>
          {exercise.sets.map((set) => (
            <SetEntry key={set.id} {...{ set, workoutUpdater, exerciseIndex }} />
          ))}
        </View>
        <Button value='Add Set' color='dark' className='mx-2 mt-2' onPress={handleAddSet} />
      </View>
    )
  },
)

export default ExerciseEntry
