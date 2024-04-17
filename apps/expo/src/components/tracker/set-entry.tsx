import { useCallback, useState } from 'react'
import { NativeSyntheticEvent, Text, TextInput, TextInputChangeEventData, View } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import { Feather } from '@expo/vector-icons'
import { SetSchema } from '^/packages/validators/src'
import { produce } from 'immer'
import { z } from 'zod'

import type { TExercise } from '~/components/tracker/workout-tracker'
import Button from '~/components/ui/button/button'
import Toggle from '../toggle/toggle'

export type TSet = z.infer<typeof SetSchema>
export interface ISetEntryProps {
  set: TSet
  exerciseIndex: number
  workoutUpdater: React.Dispatch<React.SetStateAction<TExercise[]>>
}

export interface IDeleteButtonProps {
  handlePress: () => void
}

const DeleteButton: React.FC<IDeleteButtonProps> = ({ handlePress }) => {
  return (
    <View className='mx-2 flex w-12 justify-center'>
      <Button
        className='bg-light-red h-full w-full items-center justify-center rounded-lg'
        onPress={handlePress}
      >
        <Feather name='trash-2' size={24} color='white' />
      </Button>
    </View>
  )
}

const SetEntry: React.FC<ISetEntryProps> = ({ set, workoutUpdater, exerciseIndex }) => {
  const [isUnilateral, setIsUnilateral] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [inErrorState, setInErrorState] = useState({
    weight: false,
    reps: false,
  })

  const handleWeightChange = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      workoutUpdater(
        produce((draft) => {
          const { sets } = draft[exerciseIndex]!
          const setIndex = sets.findIndex((s) => s.id === set.id)
          sets[setIndex]!.weight = Number(e.nativeEvent.text)
        }),
      )
      setInErrorState(
        produce((draft) => {
          if (completed && e.nativeEvent.text.length === 0) {
            draft.weight = true
            setCompleted(false)
          } else {
            draft.weight = false
          }
        }),
      )
    },
    [completed],
  )

  const handleRepsChange = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      workoutUpdater(
        produce((draft) => {
          const { sets } = draft[exerciseIndex]!
          const setIndex = sets.findIndex((s) => s.id === set.id)
          sets[setIndex]!.reps = Number(e.nativeEvent.text)
        }),
      )
      setInErrorState(
        produce((draft) => {
          if (completed && e.nativeEvent.text.length === 0) {
            draft.reps = true
            setCompleted(false)
          } else {
            draft.reps = false
          }
        }),
      )
    },
    [completed],
  )

  const handleCompletedPress = () => {
    const { weight, reps } = set

    if (!weight) {
      setInErrorState((prev) => ({ ...prev, weight: true }))
    }
    if (!reps) {
      setInErrorState((prev) => ({ ...prev, reps: true }))
    }

    if (weight && reps) {
      setCompleted((prev) => !prev)
    }
  }

  const handleDeletePress = useCallback(() => {
    workoutUpdater(
      produce((draft) => {
        const { sets } = draft[exerciseIndex]!
        const setIndex = sets.findIndex((s) => s.id === set.id)
        sets.splice(setIndex, 1)
      }),
    )
  }, [])

  const styleTextInput = (completed: boolean, inErrorState: boolean) => {
    if (completed) {
      return 'bg-transparent'
    } else if (inErrorState) {
      return 'border-2 border-red-400 bg-light-red'
    } else {
      return 'bg-slate-900'
    }
  }

  return (
    <Swipeable renderRightActions={() => <DeleteButton handlePress={handleDeletePress} />}>
      <View
        className={`mx-1 flex flex-row items-center justify-between rounded-lg px-2 ${
          completed ? 'bg-light-green' : 'bg-neutral-800'
        }`}
      >
        <View
          className='flex basis-14 flex-row justify-start py-1'
          testID='set-type-button-container'
        >
          <Button
            value='W'
            className={`h-9 w-full ${completed ? 'bg-transparent' : 'bg-slate-900'}`}
            color='dark'
          />
        </View>
        <View
          className='align-center flex basis-24 items-center justify-center py-1'
          testID='unilateral-switch-container'
        >
          <Toggle value={isUnilateral} onValueChange={() => setIsUnilateral((prev) => !prev)} />
        </View>
        {/* TODO: Fix tracking of unilateral sets */}
        <View className='basis-20 py-1' testID='weight-input-container'>
          {isUnilateral ? (
            <View className='gap-y-1'>
              <View className='flex flex-row items-center'>
                <Text className='mr-2 font-bold text-white'>L</Text>
                <TextInput
                  onChange={handleWeightChange}
                  className={`h-9 flex-1 rounded-lg text-lg ${styleTextInput(
                    completed,
                    inErrorState.weight,
                  )} text-center text-white`}
                />
              </View>
              <View className='flex flex-row items-center'>
                <Text className='mr-2 font-bold text-white'>R</Text>
                <TextInput
                  onChange={handleWeightChange}
                  className={`h-9 flex-1 rounded-lg text-lg ${styleTextInput(
                    completed,
                    inErrorState.weight,
                  )} text-center text-white`}
                />
              </View>
            </View>
          ) : (
            <TextInput
              onChange={handleWeightChange}
              className={`h-9 rounded-lg text-lg ${styleTextInput(
                completed,
                inErrorState.weight,
              )} text-center text-white`}
            />
          )}
        </View>
        <View className='basis-20 py-1' testID='reps-input-container'>
          {isUnilateral ? (
            <View className='gap-y-1'>
              <View className='flex flex-row items-center'>
                <Text className='mr-2 font-bold text-white'>L</Text>
                <TextInput
                  onChange={handleRepsChange}
                  className={`h-9 flex-1 rounded-lg text-lg ${styleTextInput(
                    completed,
                    inErrorState.reps,
                  )} text-center text-white`}
                />
              </View>
              <View className='flex flex-row items-center'>
                <Text className='mr-2 font-bold text-white'>R</Text>
                <TextInput
                  onChange={handleRepsChange}
                  className={`h-9 flex-1 rounded-lg text-lg ${styleTextInput(
                    completed,
                    inErrorState.reps,
                  )} text-center text-white`}
                />
              </View>
            </View>
          ) : (
            <TextInput
              onChange={handleRepsChange}
              className={`h-9 rounded-lg text-lg ${styleTextInput(
                completed,
                inErrorState.reps,
              )} text-center text-white`}
            />
          )}
        </View>
        <View className='basis-12 py-1' testID='completed-button-container'>
          <Button
            className={`flex h-9 items-center justify-center ${
              completed && 'bg-green-500 opacity-70'
            }`}
            color='dark'
            onPress={handleCompletedPress}
            disabled={inErrorState.reps || inErrorState.weight}
          >
            <Feather name='check' color='white' size={19} />
          </Button>
        </View>
      </View>
    </Swipeable>
  )
}

export default SetEntry
