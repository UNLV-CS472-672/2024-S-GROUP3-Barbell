import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import SearchBar from '~/components/ui/search-bar/SearchBar'
import { api } from '~/utils/trpc/api'

export default function ExerciseList() {
  const { data, isFetched, isFetching } = api.exercise.getAllExercises.useQuery()

  const [selectExercise, setSelect] = useState<{ [eid: number]: boolean }>({})

  const selectToggle = (eid: number) => {
    setSelect((prevState) => ({
      ...prevState,

      [eid]: !prevState[eid],
    }))
  }

  const [filteredList, setFilteredList] = useState(data)

  const exercises = (
    <View>
      <SearchBar
        filterBy='name'
        list={data}
        placeholder='Search exercise by name...'
        setFilteredList={setFilteredList}
      />

      <View className='m-2 flex flex-row items-center justify-evenly '>
        <TouchableOpacity className='ml-1 mr-1 mt-1 flex-1 rounded-lg  bg-[#C4C4C4] px-4 py-2 font-bold'>
          <Text className='text-center'>Filter by Equipment</Text>
        </TouchableOpacity>
        <TouchableOpacity className='ml-1 mr-1 mt-1 flex-1 rounded-lg bg-[#48476D] px-4 py-2 font-bold'>
          <Text className='text-center text-[#CACACA]'>Use Diagram</Text>
        </TouchableOpacity>
      </View>

      <View className='pt-1' style={{ borderBottomWidth: 1, borderBottomColor: '#737272' }} />

      <ScrollView>
        {filteredList?.map((exercise: any) => (
          <View key={exercise.id}>
            <TouchableOpacity
              className=''
              style={{ backgroundColor: selectExercise[exercise.id] ? '#303030' : '#1E1E1E' }}
              onPress={() => selectToggle(exercise.id)}
            >
              <Text className='my-[12px] text-[20px] text-slate-200'>{exercise.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  )

  return (
    <View>
      {isFetching && <RotatingBarbellIcon />}
      {isFetched && exercises}
    </View>
  )
}
