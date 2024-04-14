import React, { useState } from 'react'
import { Dimensions, Text, TouchableOpacity, View } from 'react-native'

import { AntDesign, Ionicons } from '@expo/vector-icons'

interface KeyProps {
  number: string
  handleKeyPress: (value: string) => void
}

function Key({ number, handleKeyPress } : KeyProps){
  return (
    <TouchableOpacity className="m-1 flex-1 justify-center rounded-md bg-white" onPress={() => handleKeyPress(number)}>
      <Text style={{ fontSize: 24 }} className="text-center">
        {number}
      </Text>
    </TouchableOpacity>
  )
}

interface NumericKeypadProps {
  setNumber: React.Dispatch<React.SetStateAction<any>>
  number: string
  keypadVisible: boolean
  setKeypadVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Keypad({ setNumber, number, keypadVisible, setKeypadVisible }: NumericKeypadProps) {
  const handleKeyPress = (value: string) => {
    if (value === 'backspace') {
      setNumber(number.slice(0, -1)) // else just remove the last digit
    } else if (value === '.') {
      if (!number.includes('.')) {
        // only add a '.' if there is not one already
        setNumber(number + value)
      }
    } else if (number === '0') {
      // if the only thing in the string is a 0, just replace the 0 with the digit
      setNumber(value)
    } else if (
      (number.includes('.') && number.indexOf('.') === number.length - 3) ||
      Number(number + value) > 9999.99
    ) {
      // do not allow further input if they want more than 2 decimal points of precision
      // or if they want to enter a value of 10,000 or more
      // preventing any buffer overflow attempts
    } else if (Number(value) >= 0 && Number(value) <= 9) {
      // else just concatenate as normal
      setNumber(number + value)
    }
  }

  const { height } = Dimensions.get('window')

  return !keypadVisible ? (
    <View />
  ) : (
    <View className="flex bg-slate-200 p-1" style={{ height: height * 0.35 }}>
      <View className="flex-1 flex-row justify-between">
        <Key number='1' handleKeyPress={handleKeyPress}/>
        <Key number='2' handleKeyPress={handleKeyPress}/>
        <Key number='3' handleKeyPress={handleKeyPress}/>
      </View>
      <View className="flex-1 flex-row justify-between">
        <Key number='4' handleKeyPress={handleKeyPress}/>
        <Key number='5' handleKeyPress={handleKeyPress}/>
        <Key number='6' handleKeyPress={handleKeyPress}/>
      </View>
      <View className="flex-1 flex-row justify-between">
        <Key number='7' handleKeyPress={handleKeyPress}/>
        <Key number='8' handleKeyPress={handleKeyPress}/>
        <Key number='9' handleKeyPress={handleKeyPress}/>
      </View>
      <View className="flex-1 flex-row justify-between">
        <Key number='.' handleKeyPress={handleKeyPress}/>
        <Key number='0' handleKeyPress={handleKeyPress}/>
        <TouchableOpacity
          className="m-1 flex-1 items-center justify-center rounded-md bg-white"
          onPress={() => handleKeyPress('backspace')}
        >
          <Ionicons name="backspace-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="h-12 flex-row">
        <TouchableOpacity onPress={() => setKeypadVisible(false)} className="flex-1 items-center justify-center">
          <AntDesign name="down" size={18} color="black" />
        </TouchableOpacity>
        <View className="flex-1" />
        <View className="flex-1" />
      </View>
    </View>
  )
}
