import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import SearchBar from '~/components/ui/search-bar/SearchBar'
import { api } from '~/utils/trpc/api'
import EquipmentFilter from './sortByEquipment'

export type componenttype = 'exercise' | 'equipment' | 'bodyparts'

export default function ExerciseList() {
  const { data, isFetched, isFetching } = api.exercise.getAllExercises.useQuery()
  const [VisibleComp, setVisibleComp] = useState<componenttype>('exercise')
  const [list, setList] = useState<any>(data)

  const [equipmentList, setEquipmentList] = useState<string[]>([])
  const [filterByEquipment, setFilterByEquipment] = useState<string[]>([])
  const handleFilterByEquipment = () => {
    setVisibleComp('exercise')
    setFilterByEquipment(equipmentList)
  }

  useEffect(() => {
    setList(data)
  }, [data])

  useEffect(() => {
    if (equipmentList.length > 0) {
      // if equipmentList has items, filter data based on equipmentList
      setFilteredList(
        data?.filter((workout) =>
          equipmentList.includes(
            workout.category.charAt(0).toUpperCase() + workout.category.slice(1).toLowerCase(),
          ),
        ),
      )
      setList(
        data?.filter((workout) =>
          equipmentList.includes(
            workout.category.charAt(0).toUpperCase() + workout.category.slice(1).toLowerCase(),
          ),
        ),
      )
    } else {
      // if equipmentList is empty, set filteredList to the original data
      setFilteredList(data)
      setList(data)
    }
  }, [equipmentList])

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
      <SearchBar
        filterBy='name'
        list={list}
        placeholder='Search exercise by name...'
        setFilteredList={setFilteredList}
      />

      <View className='m-2 flex flex-row items-center justify-evenly '>
        {VisibleComp == 'exercise' && (
          <TouchableOpacity
            className='ml-1 mr-1 mt-1 flex-1 rounded-lg  bg-[#C4C4C4] px-4 py-2 font-bold'
            onPress={() => {
              setVisibleComp('equipment')
            }}
          >
            <Text className='text-center'>Filter by Equipment</Text>
          </TouchableOpacity>
        )}
        {VisibleComp == 'equipment' && (
          <TouchableOpacity
            className='ml-1 mr-1 mt-1 flex-1 rounded-lg  bg-[#C4C4C4] px-4 py-2 font-bold'
            onPress={() => {
              handleFilterByEquipment()
            }}
          >
            <Text className='text-center'>Select Exercises</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity className='ml-1 mr-1 mt-1 flex-1 rounded-lg bg-[#48476D] px-4 py-2 font-bold'>
          <Text className='text-center text-[#CACACA]'>Use Diagram</Text>
        </TouchableOpacity>
      </View>
      <View className='pt-1' style={{ borderBottomWidth: 1, borderBottomColor: '#737272' }} />
      {isFetching && <RotatingBarbellIcon />}
      {isFetched && VisibleComp == 'exercise' && exercises}
      {isFetched && VisibleComp == 'equipment' && (
        <EquipmentFilter setEquipmentList={setEquipmentList} equipmentList={equipmentList} />
      )}
    </View>
  )
}
