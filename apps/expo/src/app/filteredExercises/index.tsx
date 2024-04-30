import React, { useState } from 'react'
import { Dimensions, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, useLocalSearchParams } from 'expo-router'

import NavBar from '~/components/ui/nav-bar/NavBar'
import { useGlobalContext } from '~/context/global-context'
import { api } from '~/utils/trpc/api'

export default function FilteredExercises() {
  const p = useLocalSearchParams()
  const muscle = String(p['userSelection']).toUpperCase()
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
  const { data, isFetched, isFetching } = api.exercise.getAllExercises.useQuery()
  const [] = useState()

  const filteredData = data?.filter((exercise) => exercise.bodyPart == muscle)

  const { selectedExercises, setSelectedExercises } = useGlobalContext()

  const handleSelect = (item: any) => {
    if (!selectedExercises.includes(item)) {
      // add the equipment to the list if it's not already present
      setSelectedExercises([...selectedExercises, item])
    } else {
      // remove the equipment from the list if it's already present
      const updatedList = selectedExercises.filter((selectedItem: any) => selectedItem !== item)
      setSelectedExercises(updatedList)
    }
  }
  // REPLACE PATHNAME WITH ACTUAL PATHNAME
  const rightNavText = (
    <Link href={{ pathname: '(dashboard)/' }}>
      <Text numberOfLines={1} style={{ color: '#CACACA', fontSize: 16 }}>
        Add{selectedExercises.length ? '(' + selectedExercises.length + ')' : ''}
      </Text>
    </Link>
  )

  return (
    <SafeAreaView style={{ backgroundColor: '#1E1E1E', flex: 1 }}>
      <NavBar center={'Select Exercises'} right={rightNavText} />
      <View className='pb-px-20 flex flex-row'>
        <ScrollView>
          {filteredData?.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: selectedExercises.includes(item.id) ? '#303030' : '#1E1E1E',
              }}
              onPress={() => handleSelect(item.id)}
            >
              <Text className='my-[12px] px-3 text-[20px] text-slate-200'>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
