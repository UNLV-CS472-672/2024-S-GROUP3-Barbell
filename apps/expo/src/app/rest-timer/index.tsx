import React, { useState } from 'react'
import { Alert, Button, Text, TextInput, View } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

const CountdownTimer = () => {
  const [time, setTime] = useState(0) // initial time set to 0 seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [remainingTime, setRemainingTime] = useState(0) // track remaining time for pause/resume

  const formatTime = (remainingTime: any) => {
    const mins = Math.floor(remainingTime / 60)
    const secs = remainingTime % 60
    const formattedMins = mins < 10 ? `0${mins}` : mins
    const formattedSecs = secs < 10 ? `0${secs}` : secs
    return `${formattedMins}:${formattedSecs}`
  }

  const handleTimerClick = () => {
    if (isNaN(totalSeconds) || totalSeconds <= 0) {
      Alert.alert('Please enter a valid time.')
      return
    }
    setTime(totalSeconds)
    setRemainingTime(totalSeconds)
    setIsTimerRunning(true)
  }

  const handleTimerComplete = () => {
    Alert.alert('Time is up!') // show pop-up when timer runs out
    setIsTimerRunning(false)
    setRemainingTime(0) // reset remaining time when timer completes
  }

  const handlePauseResumeTimer = () => {
    setIsTimerRunning((prevIsTimerRunning) => !prevIsTimerRunning)
  }

  const handleResetTimer = () => {
    setTime(0)
    setIsTimerRunning(false)
    setRemainingTime(0)
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CountdownCircleTimer
        isPlaying={isTimerRunning}
        duration={time}
        onComplete={handleTimerComplete}
        size={200}
        strokeWidth={12}
        colors={'#004777'}
        key={remainingTime} // ensure re-rendering when remainingTime changes
      >
        {({ remainingTime }) => (
          <View>
            <Text style={{ fontSize: 36 }}>{formatTime(remainingTime)}</Text>
          </View>
        )}
      </CountdownCircleTimer>
      <View style={{ marginTop: 20 }}>
        <Button
          title='Start Timer'
          onPress={handleTimerClick}
          disabled={isTimerRunning || remainingTime > 0}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Button
          title={isTimerRunning ? 'Pause Timer' : 'Resume Timer'}
          onPress={handlePauseResumeTimer}
          disabled={!isTimerRunning && remainingTime === 0} // disable if no timer is running or no time remaining
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Button
          title='Reset Timer'
          onPress={handleResetTimer}
          disabled={!isTimerRunning && remainingTime === 0}
        />
      </View>
    </View>
  )
}

export default CountdownTimer
