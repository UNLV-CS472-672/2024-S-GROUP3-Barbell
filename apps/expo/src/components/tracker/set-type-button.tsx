import { memo, useCallback, useState } from 'react'

import { SetType } from '@prisma/client'
import { produce } from 'immer'

import type { TSet } from '~/components/tracker/set-entry'
import type { TExercise } from '~/components/tracker/workout-tracker'
import Button from '~/components/ui/button/button'
import PickerModal from '~/components/ui/picker-modal/picker-modal'

export interface ISetTypeButtonProps {
  exerciseIndex: number
  setIndex: number
  workoutUpdater: React.Dispatch<React.SetStateAction<TExercise[]>>
  set: TSet
  completed: boolean
}

const SetTypeButton: React.FC<ISetTypeButtonProps> = memo(
  ({ exerciseIndex, workoutUpdater, set, completed, setIndex }) => {
    const [isModalVisible, setModalVisible] = useState(false)

    const calculateValue = () => {
      switch (set.type) {
        case SetType.WARMUP:
          return 'W'
        case SetType.DROPSET:
          return 'D'
        case SetType.FAILURE:
          return 'F'
        default:
          return String(setIndex + 1)
      }
    }

    const styleButton = () => {
      if (completed) {
        return 'bg-transparent'
      }

      if (set.type === SetType.WARMUP) {
        return 'bg-orange-600'
      }

      if (set.type === SetType.FAILURE) {
        return 'bg-red-600'
      }

      if (set.type === SetType.DROPSET) {
        return 'bg-blue-600'
      }

      return 'bg-slate-900'
    }

    const handleOnButtonPress = () => {
      setModalVisible(true)
    }

    const handleOnPickerModalPress = useCallback((selectedItem: SetType) => {
      workoutUpdater(
        produce((draft) => {
          draft[exerciseIndex]!.sets[setIndex]!.type = selectedItem
        }),
      )
      setModalVisible(false)
    }, [])

    return (
      <>
        <Button
          value={calculateValue()}
          className={`h-9 w-full ${styleButton()}`}
          color='dark'
          onPress={handleOnButtonPress}
        />
        <PickerModal
          title='Set Type'
          data={[SetType.WARMUP, SetType.NORMAL, SetType.FAILURE, SetType.DROPSET]}
          isVisible={isModalVisible}
          onPress={(selectedItem) => handleOnPickerModalPress(selectedItem as SetType)}
          onCancelPress={() => {
            setModalVisible(false)
          }}
          onBackdropPress={() => {
            setModalVisible(false)
          }}
        />
      </>
    )
  },
)

export default SetTypeButton
