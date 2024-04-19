import { memo, useCallback, useState } from 'react'
import { Text, View } from 'react-native'

import { AntDesign } from '@expo/vector-icons'
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
          isVisible={isModalVisible}
          onBackdropPress={() => {
            setModalVisible(false)
          }}
        >
          <View className='flex items-center justify-center gap-y-2 px-4 pb-8'>
            <Button className='flex w-full flex-row justify-between px-4 py-5' color='dark'>
              <View className='flex flex-row items-center gap-x-4'>
                <Text className='text-xl font-bold text-orange-600'>W</Text>
                <Text className='text-xl text-white'>Warm-up Set</Text>
              </View>
              <Button className='bg-neutral-800 p-2'>
                <AntDesign name='question' size={24} color='white' />
              </Button>
            </Button>
            <Button className='flex w-full flex-row justify-between px-4 py-5' color='dark'>
              <View className='flex flex-row items-center gap-x-4'>
                <Text className='text-xl font-bold text-blue-600'>D</Text>
                <Text className='text-xl text-white'>Drop Set</Text>
              </View>
              <Button className='bg-neutral-800 p-2'>
                <AntDesign name='question' size={24} color='white' />
              </Button>
            </Button>
            <Button className='flex w-full flex-row justify-between px-4 py-5' color='dark'>
              <View className='flex flex-row items-center gap-x-4'>
                <Text className='text-xl font-bold text-red-600'>F</Text>
                <Text className='text-xl text-white'>Failure Set</Text>
              </View>
              <Button className='bg-neutral-800 p-2'>
                <AntDesign name='question' size={24} color='white' />
              </Button>
            </Button>
            <Button className='flex w-full flex-row justify-between px-4 py-5' color='dark'>
              <View className='flex flex-row items-center gap-x-4'>
                <Text className='text-xl font-bold text-white'>N</Text>
                <Text className='text-xl text-white'>Normal Set</Text>
              </View>
              <Button className='bg-neutral-800 p-2'>
                <AntDesign name='question' size={24} color='white' />
              </Button>
            </Button>
          </View>
        </PickerModal>
      </>
    )
  },
)

export default SetTypeButton
