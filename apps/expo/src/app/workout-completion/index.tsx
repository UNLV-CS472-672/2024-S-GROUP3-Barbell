import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { AntDesign } from '@expo/vector-icons'

import Button from '~/components/ui/button/button'

const WorkoutCompletion: React.FC = () => {
  return (
    <SafeAreaView style={{ backgroundColor: '#1E1E1E', flex: 1 }}>
      <View className='h-full px-4'>
        <View className='flex items-start'>
          <Button color='dark' className='p-2'>
            <AntDesign name='close' size={30} color='white' />
          </Button>
        </View>

        <View className='flex flex-row items-center justify-center gap-x-4'>
          <Text className='text-3xl'>🎉</Text>
          <Text className='font-koulen text-5xl font-bold text-white'>WOOHOO!</Text>
        </View>
        <View className='mt-6 flex items-center justify-center'>
          <Text className='text-2xl font-bold text-white'>Workout Completed</Text>
          <Text className='mt-2 text-lg text-white'>You have completed 400 workouts.</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default WorkoutCompletion
