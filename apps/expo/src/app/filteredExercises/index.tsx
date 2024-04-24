import React, { useState } from 'react'
import { Dimensions, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import { muscleSelectUser } from '~/app/muscleGroup'
import NavBar from '~/components/ui/nav-bar/NavBar'
import { api } from '~/utils/trpc/api'

import { Ionicons } from '@expo/vector-icons'

export default function FilteredExercises(muscle = muscleSelectUser.NoSelection) {
  const [addCount, setAddCount] = useState(0)
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
  const { data, isFetched, isFetching } = api.exercise.getAllExercises.useQuery()
  const [selectExercise, setSelect] = useState<{ [exerciseID: number]: boolean }>({})
  const [] = useState()

  // ------------------------------------------
  // This is set to no selection for testing
  // remove when everything done
  muscle = muscleSelectUser.NoSelection
  // ------------------------------------------

  const selectToggle = (exerciseID: number) => {
    setSelect((prevState) => ({
      ...prevState,

      [exerciseID]: !prevState[exerciseID],
    }))

    if (selectExercise[exerciseID]) {
      // Post state true
      if (addCount == 0) {
        setAddCount(1)
      } else {
        setAddCount(addCount + 1)
      }
    } else {
      // Post state false
      if (addCount == 1) {
        setAddCount(0)
      } else {
        // Negative value should not appear
        setAddCount(addCount - 1)
      }
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#1C1B1B', flex: 1 }}>
      {/*<NavBar*/}
      {/*  center={'Select Exercises'}*/}
      {/*  right={*/}
      {/*    <Pressable onPress={() => router.back()}>*/}
      {/*      {addCount == 0 ? (*/}
      {/*        <Text style={{ color: '#CACACA', fontSize: 20 }}>Add</Text>*/}
      {/*      ) : (*/}
      {/*        <Text style={{ color: '#CACACA', fontSize: 20 }}>Add{addCount}</Text>*/}
      {/*      )}*/}
      {/*    </Pressable>*/}
      {/*  }*/}
      {/*/>*/}

      <View className='flex flex-row justify-between px-5'>
        <Ionicons onPress={() => router.back()} name='chevron-back' size={20} color='#CACACA' />
        <Text style={{ color: '#CACACA', fontSize: 20 }}>Select exercise</Text>
        <Pressable onPress={() => router.back()}>
          {addCount == 0 ? (
            <Text style={{ color: '#CACACA', fontSize: 20 }}>Add</Text>
          ) : (
            <Text style={{ color: '#CACACA', fontSize: 20 }}>Add{addCount}</Text>
          )}
        </Pressable>
      </View>

      {/*<View className='flex flex-row items-center'>*/}
      {/*  <Image*/}
      {/*    source={require('~assets/award/trophy.png')}*/}
      {/*    style={{*/}
      {/*      flex: 1,*/}
      {/*      width: screenWidth * 0.9,*/}
      {/*      height: screenWidth * 0.9,*/}
      {/*    }}*/}
      {/*    resizeMode='contain'*/}
      {/*  />*/}
      {/*</View>*/}

      <View className='pb-px-20 flex flex-row' style={{ height: 0.7 * screenHeight - 50 }}>
        <ScrollView>
          {data?.map((exercise: any) => (
            <View key={exercise.id} className='flex flex-row rounded-lg p-2'>
              {exercise?.bodyPart == 'ARMS' && muscle == muscleSelectUser.Arm && (
                <TouchableOpacity
                  className=''
                  style={{ backgroundColor: selectExercise[exercise.id] ? '#303030' : '#1E1E1E' }}
                  onPress={() => selectToggle(exercise.id)}
                >
                  <Text className='mx-3 my-[12px] text-[20px] text-slate-200'>{exercise.name}</Text>
                </TouchableOpacity>
              )}

              {exercise?.bodyPart == 'BACK' && muscle == muscleSelectUser.Back && (
                <TouchableOpacity
                  className=''
                  style={{ backgroundColor: selectExercise[exercise.id] ? '#303030' : '#1E1E1E' }}
                  onPress={() => selectToggle(exercise.id)}
                >
                  <Text className='mx-3 my-[12px] text-[20px] text-slate-200'>{exercise.name}</Text>
                </TouchableOpacity>
              )}

              {exercise?.bodyPart == 'CHEST' && muscle == muscleSelectUser.Chest && (
                <TouchableOpacity
                  className=''
                  style={{ backgroundColor: selectExercise[exercise.id] ? '#303030' : '#1E1E1E' }}
                  onPress={() => selectToggle(exercise.id)}
                >
                  <Text className='mx-3 my-[12px] text-[20px] text-slate-200'>{exercise.name}</Text>
                </TouchableOpacity>
              )}

              {exercise?.bodyPart == 'CORE' && muscle == muscleSelectUser.Core && (
                <TouchableOpacity
                  className=''
                  style={{ backgroundColor: selectExercise[exercise.id] ? '#303030' : '#1E1E1E' }}
                  onPress={() => selectToggle(exercise.id)}
                >
                  <Text className='mx-3 my-[12px] text-[20px] text-slate-200'>{exercise.name}</Text>
                </TouchableOpacity>
              )}

              {exercise?.bodyPart == 'LEGS' && muscle == muscleSelectUser.Leg && (
                <TouchableOpacity
                  className=''
                  style={{ backgroundColor: selectExercise[exercise.id] ? '#303030' : '#1E1E1E' }}
                  onPress={() => selectToggle(exercise.id)}
                >
                  <Text className='mx-3 my-[12px] text-[20px] text-slate-200'>{exercise.name}</Text>
                </TouchableOpacity>
              )}

              {exercise?.bodyPart == 'SHOULDERS' && muscle == muscleSelectUser.Shoulder && (
                <TouchableOpacity
                  className=''
                  style={{ backgroundColor: selectExercise[exercise.id] ? '#303030' : '#1E1E1E' }}
                  onPress={() => selectToggle(exercise.id)}
                >
                  <Text className='mx-3 my-[12px] text-[20px] text-slate-200'>{exercise.name}</Text>
                </TouchableOpacity>
              )}

              {muscle == muscleSelectUser.NoSelection && (
                <TouchableOpacity
                  className=''
                  style={{ backgroundColor: selectExercise[exercise.id] ? '#303030' : '#1E1E1E' }}
                  onPress={() => selectToggle(exercise.id)}
                >
                  <Text className='mx-3 my-[12px] text-[20px] text-slate-200'>{exercise.name}</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </ScrollView>
      </View>

      <View className='m-2 flex flex-row items-center' style={{ position: 'absolute', bottom: 40 }}>
        <TouchableOpacity
          className='ml-5 mr-2 mt-1 flex-1 rounded-lg px-4 py-4 font-bold'
          style={{ backgroundColor: '#CACACA' }}
          onPress={() => {}}
        >
          <Text style={{ color: '#1C1B1B', textAlign: 'center' }}>Finish</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className='ml-2 mr-5 mt-1 flex-1 rounded-lg px-4 py-4 font-bold'
          style={{ backgroundColor: '#48476D' }}
          onPress={() => {
            setSelect({})
            setAddCount(0)
          }}
        >
          <Text style={{ color: '#CACACA', textAlign: 'center' }}>Reset Filters</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
