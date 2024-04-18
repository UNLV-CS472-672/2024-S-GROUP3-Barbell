import React, { useState } from 'react'
import { Dimensions, Text, TouchableOpacity, View } from 'react-native'

import { AntDesign, Ionicons } from '@expo/vector-icons'

interface NumericKeypadProps {
  setNumber: React.Dispatch<React.SetStateAction<any>>
  number: string
  keypadVisible: boolean
  setKeypadVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Keypad({
  setNumber,
  number,
  keypadVisible,
  setKeypadVisible,
}: NumericKeypadProps) {
  const handleKeyPress = (value: string) => {
    /* istanbul ignore next */
    if (value === 'backspace') {
      setNumber(number.slice(0, -1)) // remove the last digit
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

  const keypadArrangement = [[1,2,3], [4,5,6], [7,8,9], ['.', 0, 'backspace']];
  const keyFontSize = 24;

  const keypadRows = keypadArrangement.map(row => {
    return (
      <View className='flex-1 flex-row justify-between' key={row.toString()}>
        {
          row.map(keypadKey => {
            let btnFace = <Text style={{ fontSize: keyFontSize }} className='text-center'>{keypadKey}</Text>;
            if (keypadKey === 'backspace') {
              btnFace = <Ionicons name='backspace-outline' size={keyFontSize} color='black' />;
            }
            return (
              <TouchableOpacity
                key={keypadKey}
                testID={`test-${keypadKey}`}
                className='m-1 h-20 flex-1 justify-center items-center rounded-md bg-white'
                onPress={() => handleKeyPress(keypadKey.toString())}>
                {btnFace}
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  });

  return !keypadVisible ? (
    <View testID='invisible-test' />
  ) : (
    <View className="flex bg-slate-200 p-1">
      <View>{keypadRows}</View>
      <View className='h-12 flex-row'>
        <TouchableOpacity
          testID='test-minimize'
          onPress={() => setKeypadVisible(false)}
          className='flex-1 items-center justify-center'
        >
          <AntDesign name='down' size={18} color='black' />
        </TouchableOpacity>
        <View className='flex-1' />
        <View className='flex-1' />
      </View>
    </View>
  )
}