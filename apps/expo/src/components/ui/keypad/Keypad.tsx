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

  return !keypadVisible ? (
    <View testID='invisible-test' />
  ) : (
    <View className='flex bg-slate-200 p-1' style={{ height: height * 0.35 }}>
      <View className='flex-1 flex-row justify-between'>
        <TouchableOpacity
          testID='test-1'
          className='m-1 flex-1 justify-center rounded-md bg-white'
          onPress={() => handleKeyPress('1')}
        >
          <Text style={{ fontSize: 24 }} className='text-center'>
            1
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID='test-2'
          className='m-1 flex-1 justify-center rounded-md bg-white'
          onPress={() => handleKeyPress('2')}
        >
          <Text style={{ fontSize: 24 }} className='text-center'>
            2
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID='test-3'
          className='m-1 flex-1 justify-center rounded-md bg-white'
          onPress={() => handleKeyPress('3')}
        >
          <Text style={{ fontSize: 24 }} className='text-center'>
            3
          </Text>
        </TouchableOpacity>
      </View>
      <View className='flex-1 flex-row justify-between'>
        <TouchableOpacity
          testID='test-4'
          className='m-1 flex-1 justify-center rounded-md bg-white'
          onPress={() => handleKeyPress('4')}
        >
          <Text style={{ fontSize: 24 }} className='text-center'>
            4
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID='test-5'
          className='m-1 flex-1 justify-center rounded-md bg-white'
          onPress={() => handleKeyPress('5')}
        >
          <Text style={{ fontSize: 24 }} className='text-center'>
            5
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID='test-6'
          className='m-1 flex-1 justify-center rounded-md bg-white'
          onPress={() => handleKeyPress('6')}
        >
          <Text style={{ fontSize: 24 }} className='text-center'>
            6
          </Text>
        </TouchableOpacity>
      </View>
      <View className='flex-1 flex-row justify-between'>
        <TouchableOpacity
          testID='test-7'
          className='m-1 flex-1 justify-center rounded-md bg-white'
          onPress={() => handleKeyPress('7')}
        >
          <Text style={{ fontSize: 24 }} className='text-center'>
            7
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID='test-8'
          className='m-1 flex-1 justify-center rounded-md bg-white'
          onPress={() => handleKeyPress('8')}
        >
          <Text style={{ fontSize: 24 }} className='text-center'>
            8
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID='test-9'
          className='m-1 flex-1 justify-center rounded-md bg-white'
          onPress={() => handleKeyPress('9')}
        >
          <Text style={{ fontSize: 24 }} className='text-center'>
            9
          </Text>
        </TouchableOpacity>
      </View>
      <View className='flex-1 flex-row justify-between'>
        <TouchableOpacity
          testID='test-.'
          className='m-1 flex-1 justify-center rounded-md bg-white'
          onPress={() => handleKeyPress('.')}
        >
          <Text style={{ fontSize: 24 }} className='text-center'>
            .
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID='test-0'
          className='m-1 flex-1 justify-center rounded-md bg-white'
          onPress={() => handleKeyPress('0')}
        >
          <Text style={{ fontSize: 24 }} className='text-center'>
            0
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID='test-backspace'
          className='m-1 flex-1 items-center justify-center rounded-md bg-white'
          onPress={() => handleKeyPress('backspace')}
        >
          <Ionicons name='backspace-outline' size={24} color='black' />
        </TouchableOpacity>
      </View>
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
