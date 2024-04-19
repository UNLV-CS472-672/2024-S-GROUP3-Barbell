import { TouchableOpacity } from '@gorhom/bottom-sheet'
import React, {useState} from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import SearchBar from '~/components/ui/search-bar/SearchBar'

import { api } from '~/utils/trpc/api'

export default function ExerciseList() {
  const { data, isFetched, isFetching } = api.exercise.getAllExercises.useQuery()

  const [selectExercise, setSelect] = useState<{[eid: number]: boolean }>({});

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
          filterBy="name"
          list={data}
          placeholder="Search exercise by name..."
          setFilteredList={setFilteredList}
        />
  
      <View className="flex flex-row items-center mx-3 rounded-[5px] justify-evenly pt-2">
        <View className='px-4 py-[6px] rounded-[5px] flex-1 mx-1 border-[1px] border-[#CACACA] bg-[#424242]'>
          <TouchableOpacity>
            <Text className="rounded-[5px] text-[20px] text-[#FFFFFF] text-center">
              Filter by Equipment
            </Text>
          </TouchableOpacity>
        </View>
        <View className='px-4 py-[6px] rounded-[5px] flex-1 mx-1 border-[1px] border-[#CACACA] bg-[#424242]'>
          <TouchableOpacity>
            <Text className="rounded-[5px] text-[20px] text-[#FFFFFF] text-center">
              Use Diagram
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="pt-3" style={{ borderBottomWidth: 1, borderBottomColor: '#737272' }} />

    <ScrollView className='h-[80%]'>
      {filteredList?.map((exercise: any) => (
        <View>
          <TouchableOpacity key={exercise.id} className=''
          style={{backgroundColor: selectExercise[exercise.id] ? "#303030" : "#1E1E1E"}}
          onPress={() => selectToggle(exercise.id)}>
            <Text  className='text-slate-200 text-[20px] my-[12px]'>
              {exercise.name}
            </Text>
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
