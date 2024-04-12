import { TouchableOpacity } from '@gorhom/bottom-sheet'
import React, {useState} from 'react'
import { Text, View, TextInput } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import SearchBar from '../ui/search-bar/SearchBar'
import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import { api } from '~/utils/api'

export default function WorkoutList() {
  // Query data
  const { data, isFetched, isFetching } = api.workout.getAllWorkouts.useQuery()

  // Select an exercise
  const [selectExercise, setSelect] = useState<{[wid: number]: boolean }>({});
  const selectToggle = (wid: number) => {
      setSelect((prevState) => ({
      [wid]: !prevState[wid],
      }));
  };

  //Search bar
  const [searchTerm, setTerm] = useState('');
  const filteredworkouts = data?.filter((workout) =>
    workout.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  
  const workouts =
  <View>
    <View className="mx-3 bg-[#272727] rounded-[5px]">
      <TextInput className="text-[12px] text-[#CACACA] px-4 py-[6px] mx-1
          placeholder:text-[#CACACA] placeholder:text-[20px] placeholder:italic placeholder:opacity-40" 
          placeholder= "Search workout by name..."
          onChangeText={setTerm} value={searchTerm}>
      </TextInput>
    </View>

    <View className=" bg-[#CACACA] h-[1px] color-slate-200 my-[4px] opacity-[.3] mx-[13px]"/>
    
    <ScrollView className='px-[15px]'>
      {filteredworkouts.map((workout) =>
        <TouchableOpacity key={workout.id} className='px-5 mx-5' 
        style={{backgroundColor: selectExercise[workout.id] ? "#48476D" : "#1E1E1E"}}
        onPress={() => selectToggle(workout.id)}>
          <Text  className='text-slate-200 text-[20px] px-4'>
            {workout.name} 
          </Text>
          <Text className='text-slate-200 text-[15px] pb-4 px-6'>
            {workout.description}
          </Text>
        </TouchableOpacity>)}
    </ScrollView>
  </View>

  return (
    <View>
      {isFetched && workouts}
      {isFetching && <RotatingBarbellIcon />}
    </View>
  )
}