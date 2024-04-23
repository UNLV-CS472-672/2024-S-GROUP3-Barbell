import React, { useState } from 'react'
import { Text, Touchable, TouchableOpacity, View } from 'react-native'

export default function EquipmentFilter() {
  const equipmentNameList = ['Dumbbell', 'Barbell', 'Bodyweight', 'Machine', 'Other']

  const [equipSelect, setSelect] = useState<{ [eid: string]: boolean }>({})

  const selectToggle = (eid: string) => {
    setSelect((prevState) => ({
      ...prevState,

      [eid]: !prevState[eid],
    }))
  }

  return (
    <View>
      {equipmentNameList.map((equipment, index) => (
        <TouchableOpacity
          key={index}
          className=''
          style={{ backgroundColor: equipSelect[equipment] ? '#303030' : '#1E1E1E' }}
          onPress={() => selectToggle(equipment)}
        >
          <Text className='my-[12px] text-[20px] text-slate-200'>{equipment}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}
