import React, { useState } from 'react'
import { Dimensions, Text, View } from 'react-native'
// Using the new chart library to see how it looks.
// Properties: https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/blob/HEAD/docs/LineChart/LineChartProps.md
import { LineChart } from 'react-native-gifted-charts'

import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import Label from '~/components/ui/label/Label'
import { useGlobalContext } from '~/context/global-context'
// To get the user's data, in particular the WorkoutLogs
import { api } from '~/utils/trpc/api'

// Just use react-native-chart-kit to display the user's workout across each month for current year.
export default function DisplayWorkoutFrequencyGraph() {
  const { userData } = useGlobalContext()
  const userID: number = userData?.id!
  let values = [
    { value: 0, label: 'Jan' },
    { value: 0, label: 'Feb' },
    { value: 0, label: 'Mar' },
    { value: 0, label: 'Apr' },
    { value: 0, label: 'May' },
    { value: 0, label: 'Jun' },
    { value: 0, label: 'Jul' },
    { value: 0, label: 'Aug' },
    { value: 0, label: 'Sep' },
    { value: 0, label: 'Oct' },
    { value: 0, label: 'Nov' },
    { value: 0, label: 'Dec' },
  ]

  const screenWidth = Dimensions.get('screen').width * 0.7
  const screenHeight = Dimensions.get('screen').height * 0.2

  const {
    data: logData,
    isFetching,
    isFetched,
  } = api.user.getUserWorkoutHistory.useQuery({ userId: userID })

  console.log(logData)

  const currYear = new Date().getFullYear()
  if (!(logData === undefined)) {
    for (let i = 0; i < logData!.workoutHistory.length; i++) {
      let year = logData!.workoutHistory[i]!.finishedAt.getFullYear()
      if (year === currYear) {
        // Valid log, check month and increment
        let month: number = logData!.workoutHistory[i]!.finishedAt.getMonth() // Starts at 0 indexing for Jan
        values[month]!.value++
      }
    }
  }

  // Find max value to make graph more dynamic
  let max = 0
  for (let i = 0; i < 12; i++) {
    if (max < values[i]!.value) {
      max = values[i]!.value
    }
  }

  let maxValue = 0
  if (max % 5 == 0) {
    maxValue = max
  } else {
    maxValue = max + 5 - (max % 5)
  }

  const loadingChart = (
    <View className='h-20'>
      <RotatingBarbellIcon color={'white'} />
    </View>
  )

  const chart = (
    <View style={{ paddingTop: 7 }}>
      <LineChart
        data={values}
        startFillColor='#FFFFFF'
        thickness={2}
        color={'#FFFFFF'}
        backgroundColor={'#48476D'}
        dataPointsColor={'#FFFFFF'}
        dataPointsRadius={3}
        spacing={screenWidth * 0.09}
        adjustToWidth
        height={100}
        yAxisColor={'#FFFFFF'}
        xAxisColor={'#FFFFFF'}
        maxValue={maxValue}
        mostNegativeValue={0}
        hideRules
        xAxisLabelTextStyle={{ fontSize: 8, color: '#FFFFFF' }}
        yAxisTextStyle={{ fontSize: 8, color: '#FFFFFF' }}
        stepValue={5}
      />
    </View>
  )

  return (
    <View>
      <View style={{ backgroundColor: '#48476D' }} className='rounded-2xl p-2'>
        <Label text='Workout Frequency' textColor='white' backgroundColor='#34344F' />
        {isFetching && loadingChart}
        {isFetched && chart}
      </View>
    </View>
  )
}
