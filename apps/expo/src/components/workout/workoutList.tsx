import React, { useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { router } from 'expo-router'

import { AntDesign } from '@expo/vector-icons'

import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import Button from '~/components/ui/button/button'
import SearchBar from '~/components/ui/search-bar/SearchBar'
import { useGlobalContext } from '~/context/global-context'
import colors from '~/styles/colors'
import { api } from '~/utils/trpc/api'

export default function WorkoutList() {
  const { userData } = useGlobalContext()

  if (!userData) {
    return null
  }

  const {
    data: workoutTemplates,
    isFetched,
    isFetching,
  } = api.user.getUserSavedWorkouts.useQuery({ userId: userData.id })

  console.log('workoutTemplates', workoutTemplates)

  const savedWorkouts = workoutTemplates ?? []

  const [filteredList, setFilteredList] = useState(savedWorkouts)

  return (
    <View>
      {isFetching ? (
        <RotatingBarbellIcon />
      ) : (
        <View>
          <SearchBar
            filterBy='name'
            list={savedWorkouts}
            placeholder='Search workout by name...'
            setFilteredList={
              setFilteredList as React.Dispatch<React.SetStateAction<any[] | undefined>>
            }
          />
          <ScrollView className='flex h-full px-3'>
            {filteredList?.map((workout) => (
              <Button
                key={workout.id}
                className='mb-2 bg-neutral-800 p-4'
                onPress={() => {
                  router.replace('(dashboard)/')
                }}
              >
                <View className='flex'>
                  <Text className='flex-1 text-xl font-bold text-white'>{workout.name}</Text>
                  <View className='mt-1 flex flex-row items-center gap-x-2'>
                    <AntDesign name='heart' size={18} color={colors.tracker.cancel} />
                    <Text className='text-light-red'>{workout.likes}</Text>
                  </View>
                </View>
                {workout.description && (
                  <Text className='mt-1 text-slate-200'>{workout.description}</Text>
                )}

                <View className='mt-2'>
                  <Text className='font-bold text-slate-200'>Exercises</Text>
                  {workout.exercises.map((exercise) => (
                    <Text key={exercise.id} className='text-slate-200'>
                      {exercise.name}
                    </Text>
                  ))}
                </View>
              </Button>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  )
}
