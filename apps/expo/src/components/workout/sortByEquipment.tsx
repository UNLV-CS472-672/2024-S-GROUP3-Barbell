import React, { useState } from 'react'
import { Text, Touchable, TouchableOpacity, View } from 'react-native'

interface EquipmentFilterProps {
  setEquipmentList: any
  equipmentList: string[]
}

export default function EquipmentFilter({ setEquipmentList, equipmentList }: EquipmentFilterProps) {
  const equipmentNameList = ['Dumbbell', 'Barbell', 'Bodyweight', 'Machine', 'Other']

  const handleEquipmentList = (equipment: string) => {
    if (!equipmentList.includes(equipment)) {
      // add the equipment to the list if it's not already present
      setEquipmentList([...equipmentList, equipment])
    } else {
      // remove the equipment from the list if it's already present
      const updatedList = equipmentList.filter((item) => item !== equipment)
      setEquipmentList(updatedList)
    }
  }

  return (
    <View>
      {equipmentNameList.map((equipment, index) => (
        <TouchableOpacity
          key={index}
          style={{ backgroundColor: equipmentList.includes(equipment) ? '#303030' : '#1E1E1E' }}
          onPress={() => handleEquipmentList(equipment)}
        >
          <Text className='my-[12px] px-2 text-[20px] text-slate-200'>{equipment}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}
