import { useCallback, useState } from 'react'
import { NativeSyntheticEvent, Text, TextInput, TextInputChangeEventData, View } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import { Feather } from '@expo/vector-icons'
import { SetSchema } from '^/packages/validators/src'
import { produce } from 'immer'
import { z } from 'zod'

import type { TExercise } from '~/components/tracker/workout-tracker'
import Toggle from '~/components/toggle/toggle'
import SetTypeButton from '~/components/tracker/set-type-button'
import Button from '~/components/ui/button/button'

export type TSet = z.infer<typeof SetSchema>
export interface ISetEntryProps {
  set: TSet
  exerciseIndex: number
  workoutUpdater: React.Dispatch<React.SetStateAction<TExercise[]>>
  setIndex: number
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

const SetEntry: React.FC<ISetEntryProps> = ({ set, workoutUpdater, exerciseIndex, setIndex }) => {
  const [isUnilateral, setIsUnilateral] = useState(set.unilateral)
  const [completed, setCompleted] = useState(false)
  const [inErrorState, setInErrorState] = useState({
    weight: false,
    reps: false,
    leftWeight: false,
    rightWeight: false,
    leftReps: false,
    rightReps: false,
  })

  const handleWeightChange = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>, idx: number) => {
      workoutUpdater(
        produce((draft) => {
          const { sets } = draft[exerciseIndex]!
          const setIndex = sets.findIndex((s) => s.id === set.id)
          sets[setIndex]!.weight[idx] = Number(e.nativeEvent.text)
        }),
      )
      setInErrorState(
        produce((draft) => {
          if (isUnilateral) {
            if (completed && e.nativeEvent.text.length === 0) {
              if (idx === 0) {
                draft.leftWeight = true
              } else {
                draft.rightWeight = true
              }
              setCompleted(false)
            } else {
              if (idx === 0) {
                draft.leftWeight = false
              } else {
                draft.rightWeight = false
              }
            }
            return
          }
          if (completed && e.nativeEvent.text.length === 0) {
            draft.weight = true
            setCompleted(false)
          } else {
            draft.weight = false
          }
        }),
      )
    },
    [completed, isUnilateral, exerciseIndex],
  )

  const handleRepsChange = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>, idx: number) => {
      workoutUpdater(
        produce((draft) => {
          const { sets } = draft[exerciseIndex]!
          const setIndex = sets.findIndex((s) => s.id === set.id)
          sets[setIndex]!.reps[idx] = Number(e.nativeEvent.text)
        }),
      )
      setInErrorState(
        produce((draft) => {
          if (isUnilateral) {
            if (completed && e.nativeEvent.text.length === 0) {
              if (idx === 0) {
                draft.leftReps = true
              } else {
                draft.rightReps = true
              }
              setCompleted(false)
            } else {
              if (idx === 0) {
                draft.leftReps = false
              } else {
                draft.rightReps = false
              }
            }
          } else {
            if (completed && e.nativeEvent.text.length === 0) {
              draft.reps = true
              setCompleted(false)
            } else {
              draft.reps = false
            }
          }
        }),
      )
    },
    [completed, isUnilateral, exerciseIndex],
  )

  const handleCompletedPress = () => {
    const { weight, reps } = set

    // Non unilateral sets
    if ((weight.length < 2 && reps.length < 2) || !isUnilateral) {
      if (!weight[0]) {
        setInErrorState((prev) => ({ ...prev, weight: true }))
      }
      if (!reps[0]) {
        setInErrorState((prev) => ({ ...prev, reps: true }))
      }
      if (weight[0] && reps[0]) {
        setCompleted((prev) => !prev)
      }
    }
    // unilateral sets
    else {
      if (!weight[0]) {
        setInErrorState((prev) => ({ ...prev, leftWeight: true }))
      }
      if (!weight[1]) {
        setInErrorState((prev) => ({ ...prev, rightWeight: true }))
      }
      if (!reps[0]) {
        setInErrorState((prev) => ({ ...prev, leftReps: true }))
      }
      if (!reps[1]) {
        setInErrorState((prev) => ({ ...prev, rightReps: true }))
      }
      if (weight[0] && weight[1] && reps[0] && reps[1]) {
        setCompleted((prev) => !prev)
      }
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
  }, [exerciseIndex])

  const styleTextInput = (completed: boolean, inErrorState: boolean) => {
    if (completed) {
      return 'bg-transparent'
    } else if (inErrorState) {
      return 'border-2 border-red-400 bg-light-red'
    } else {
      return 'bg-slate-900'
    }
  }

  const handleUnilateralSwitch = useCallback(() => {
    if (!isUnilateral) {
      workoutUpdater(
        produce((draft) => {
          const { sets } = draft[exerciseIndex]!
          const setIndex = sets.findIndex((s) => s.id === set.id)
          if (sets[setIndex]!.weight.length === 1) {
            sets[setIndex]!.weight.push(sets[setIndex]!.weight[0] as number)
            sets[setIndex]!.reps.push(sets[setIndex]!.reps[0] as number)
          } else {
            sets[setIndex]!.weight[1] = sets[setIndex]!.weight[0] as number
            sets[setIndex]!.reps[1] = sets[setIndex]!.reps[0] as number
          }
        }),
      )
      setInErrorState(
        produce((draft) => {
          draft.leftWeight = false
          draft.rightWeight = false
          draft.leftReps = false
          draft.rightReps = false
        }),
      )
    }

    setInErrorState(
      produce((draft) => {
        draft.weight = false
        draft.reps = false
      }),
    )
    workoutUpdater(
      produce((draft) => {
        const { sets } = draft[exerciseIndex]!
        const setIndex = sets.findIndex((s) => s.id === set.id)
        sets[setIndex]!.unilateral = !sets[setIndex]!.unilateral
      }),
    )
    setIsUnilateral((prev) => !prev)
  }, [isUnilateral, inErrorState, exerciseIndex])

  const isDisabled = () => {
    if (isUnilateral) {
      return (
        inErrorState.leftWeight ||
        inErrorState.rightWeight ||
        inErrorState.leftReps ||
        inErrorState.rightReps
      )
    }
    return inErrorState.reps || inErrorState.weight
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
          <SetTypeButton set={set} {...{ workoutUpdater, completed, exerciseIndex, setIndex }} />
        </View>
        <View
          className='align-center flex basis-24 items-center justify-center py-1'
          testID='unilateral-switch-container'
        >
          <Toggle value={isUnilateral} onValueChange={handleUnilateralSwitch} />
        </View>

        <View className='basis-20 py-1' testID='weight-input-container'>
          {isUnilateral ? (
            <View className='gap-y-1'>
              <View className='flex flex-row items-center'>
                <Text className='mr-2 font-bold text-white'>L</Text>
                <TextInput
                  onChange={(e) => handleWeightChange(e, 0)}
                  value={set.weight[0] ? set.weight[0]!.toString() : ''}
                  className={`h-9 flex-1 rounded-lg text-lg ${styleTextInput(
                    completed,
                    inErrorState.leftWeight,
                  )} text-center text-white`}
                />
              </View>
              <View className='flex flex-row items-center'>
                <Text className='mr-2 font-bold text-white'>R</Text>
                <TextInput
                  onChange={(e) => handleWeightChange(e, 1)}
                  value={set.weight[1] ? set.weight[1]!.toString() : ''}
                  className={`h-9 flex-1 rounded-lg text-lg ${styleTextInput(
                    completed,
                    inErrorState.rightWeight,
                  )} text-center text-white`}
                />
              </View>
            </View>
          ) : (
            <TextInput
              onChange={(e) => handleWeightChange(e, 0)}
              value={set.weight[0] ? set.weight[0]!.toString() : ''}
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
                  onChange={(e) => handleRepsChange(e, 0)}
                  value={set.reps[0] ? set.reps[0]!.toString() : ''}
                  className={`h-9 flex-1 rounded-lg text-lg ${styleTextInput(
                    completed,
                    inErrorState.leftReps,
                  )} text-center text-white`}
                />
              </View>
              <View className='flex flex-row items-center'>
                <Text className='mr-2 font-bold text-white'>R</Text>
                <TextInput
                  onChange={(e) => handleRepsChange(e, 1)}
                  value={set.reps[1] ? set.reps[1]!.toString() : ''}
                  className={`h-9 flex-1 rounded-lg text-lg ${styleTextInput(
                    completed,
                    inErrorState.rightReps,
                  )} text-center text-white`}
                />
              </View>
            </View>
          ) : (
            <TextInput
              onChange={(e) => handleRepsChange(e, 0)}
              value={set.reps[0] ? set.reps[0]!.toString() : ''}
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
            disabled={isDisabled()}
          >
            <Feather name='check' color='white' size={19} />
          </Button>
        </View>
      </View>
    </Swipeable>
  )
}

export default SetEntry
