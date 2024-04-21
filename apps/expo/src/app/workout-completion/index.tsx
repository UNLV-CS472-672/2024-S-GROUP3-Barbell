import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useLocalSearchParams } from 'expo-router'

import { AntDesign, Ionicons } from '@expo/vector-icons'

import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import { TExercise } from '~/components/tracker/workout-tracker'
import Button from '~/components/ui/button/button'
import { useGlobalContext } from '~/context/global-context'
import colors from '~/styles/colors'
import { formatForWorkoutCompletion } from '~/utils/timerFormatter'
import { api } from '~/utils/trpc/api'

export type WorkoutCompletionParams = {
  workoutName: string
  exercises: string
  duration: string
  dateFinished: string
}

const WorkoutCompletion: React.FC = () => {
  const { userData } = useGlobalContext()
  const { data, isFetching } = api.user.getUserWorkoutHistory.useQuery({
    userId: userData!.id,
  })

  const { workoutName, exercises, duration, dateFinished } =
    useLocalSearchParams<WorkoutCompletionParams>()
  const parsedExercises: TExercise[] = JSON.parse(exercises as string)

  return (
    <SafeAreaView style={{ backgroundColor: '#1E1E1E', flex: 1 }}>
      <View className='h-full px-4'>
        {!isFetching ? (
          <>
            <View className='flex items-start'>
              <Button
                color='dark'
                className='flex p-2'
                onPress={() => router.replace('(dashboard)/')}
              >
                <AntDesign name='close' size={30} color='white' />
              </Button>
            </View>

            <View className='mb-4 flex flex-1 justify-between'>
              <View>
                <View className='flex flex-row items-center justify-center gap-x-4'>
                  <Text className='text-3xl'>🎉</Text>
                  <Text className='font-koulen text-5xl font-bold text-white'>WOOHOO!</Text>
                </View>
                <View className='mt-6 flex items-center justify-center'>
                  <Text className='text-2xl font-bold text-white'>Workout Completed</Text>
                  {data && (
                    <Text className='mt-2 text-lg text-white'>
                      You have completed {data.workoutHistory.length} workouts.
                    </Text>
                  )}
                </View>
              </View>

              <View className='rounded-lg border border-slate-200 p-3'>
                <Text className='text-lg font-bold text-white'>{workoutName}</Text>
                <Text className='mt-3 text-slate-200'>{dateFinished}</Text>
                <View className='mt-1 flex flex-row items-center gap-x-2'>
                  <Ionicons name='time' size={16} color={colors.bottomav.icon} />
                  <Text className='text-slate-200'>
                    {formatForWorkoutCompletion(parseInt(duration))}
                  </Text>
                </View>
                <View className='mt-2 flex'>
                  <Text className='mb-1 font-bold text-white'>Exercise</Text>
                  {parsedExercises.map((exercise) => (
                    <Text key={exercise.id} className='text-slate-200'>
                      {exercise.sets.length} x {exercise.name}
                    </Text>
                  ))}
                </View>
              </View>

              <Button color='dark' onPress={() => router.replace('(dashboard)/')}>
                <Text className='py-2 text-center text-xl font-semibold text-white'>
                  Back to Dashboard
                </Text>
              </Button>
            </View>
          </>
        ) : (
          <View className='flex h-full items-center justify-center'>
            <RotatingBarbellIcon size={50} />
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

export default WorkoutCompletion
