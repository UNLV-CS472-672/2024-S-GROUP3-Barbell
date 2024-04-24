import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import Button from '~/components/ui/button/button'
import SearchBar from '~/components/ui/search-bar/SearchBar'
import { useGlobalContext } from '~/context/global-context'
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

  const savedWorkouts = workoutTemplates?.savedWorkouts ?? []

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
          <ScrollView>
            {filteredList?.map((workout) => (
              <Button key={workout.id}>
                <Text>{workout.name}</Text>
                {workout.description && <Text>{workout.description}</Text>}
                <View>
                  <Text>{workout.likes}</Text>
                </View>
              </Button>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  )
}
