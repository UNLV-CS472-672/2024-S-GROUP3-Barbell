import { TouchableOpacity } from '@gorhom/bottom-sheet'
import React, {useState} from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import { api } from '~/utils/api'

export default function ExerciseList() {
  const { data, isFetched, isFetching } = api.exercise.getAllExercises.useQuery()

  const [selectExercise, setSelect] = useState<{[eid: number]: boolean }>({});

  const selectToggle = (eid: number) => {
    setSelect((prevState) => ({
      prevState,
      [eid]: !prevState[eid],
    }));
  };

  const exercises =
  <ScrollView className='px-[15px]'>
    {data?.map((exercise) => 
      <TouchableOpacity key={exercise.id} className='' 
      style={{backgroundColor: selectExercise[exercise.id] ? "#48476D" : "#1E1E1E"}}
      onPress={() => selectToggle(exercise.id)}>
        <Text  className='text-slate-200 text-[20px] my-[12px]'>
          {exercise.name} 
        </Text>
      </TouchableOpacity>)}
  </ScrollView>

  return (
    <View>
      {isFetching && <RotatingBarbellIcon />}
      {isFetched && exercises}
    </View>
  )
}
