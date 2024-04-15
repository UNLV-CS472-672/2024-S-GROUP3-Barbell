import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { TouchableOpacity } from '@gorhom/bottom-sheet'

import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import SearchBar from '~/components/ui/search-bar/SearchBar'
import { api } from '~/utils/api'

export default function WorkoutList() {
  // Query data
  const { data, isFetched, isFetching } = api.workout.getAllWorkouts.useQuery()

  // Select an exercise
  const [selectExercise, setSelect] = useState<{ [wid: number]: boolean }>({})
  const selectToggle = (wid: number) => {
    setSelect((prevState) => ({
      [wid]: !prevState[wid],
    }))
  }

  const [filteredList, setFilteredList] = useState(data)

  const workouts = (
    <View>
      <SearchBar
        filterBy="name"
        list={data}
        placeholder="Search workout by name..."
        setFilteredList={setFilteredList}
      />
      <View className="pt-3" style={{ borderBottomWidth: 1, borderBottomColor: '#737272' }} />

      <ScrollView className="h-full">
        {filteredList?.map((workout) => (
          <View>
            <View className="px-3" key={workout.id}>
              <TouchableOpacity
                key={workout.id}
                className="pt-5"
                style={{ backgroundColor: selectExercise[workout.id] ? '#272727' : '#1E1E1E' }}
                onPress={() => selectToggle(workout.id)}
              >
                <Text className="px-2 text-[20px] text-slate-200">{workout.name}</Text>
                <View className="pt-2" />
                <Text className="px-4 pb-4 italic text-slate-200 opacity-70">{workout.description}</Text>
              </TouchableOpacity>
            </View>
            <View className="ml-3 mr-3" style={{ borderBottomWidth: 1, borderBottomColor: '#737272' }} />
          </View>
        ))}
      </ScrollView>
    </View>
  )

  return (
    <View>
      {isFetched && workouts}
      {isFetching && <RotatingBarbellIcon />}
    </View>
  )
}