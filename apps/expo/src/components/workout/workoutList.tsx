import { TouchableOpacity } from '@gorhom/bottom-sheet'
import React, {useState} from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import { api } from '~/utils/api'

export default function WorkoutList() {
    const { data, isFetched, isFetching } = api.workout.getAllWorkouts.useQuery()

    const [selectExercise, setSelect] = useState<{[eid: number]: boolean }>({});

    const selectToggle = (eid: number) => {
        setSelect((prevState) => ({
        prevState,
        [eid]: !prevState[eid],
        }));
    };

    const workouts =
    <ScrollView className='px-[15px]'>
      {data?.map((workout) => 
        <TouchableOpacity key={workout.id} className='px-5 mx-5' 
        style={{backgroundColor: selectExercise[workout.id] ? "#48476D" : "#1E1E1E"}}
        onPress={() => selectToggle(workout.id)}>
          <Text  className='text-slate-200 text-[20px]'>
            {workout.name}
          </Text>
          <Text className='text-slate-200 text-[15px] ml-4'>
            Exercise here
            </Text>
            <Text className='text-slate-200 text-[15px] ml-4'>
            Exercise here
            </Text>
        </TouchableOpacity>)}
    </ScrollView>
  
    return (
      <View>
        {isFetching && <RotatingBarbellIcon />}
        {isFetched && workouts}
      </View>
    )
}