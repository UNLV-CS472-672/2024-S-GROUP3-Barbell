import React, { useEffect, useState } from 'react'
import { Alert, Button, Text, TextInput, View } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

const CountdownTimer = () => {
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')
  const [time, setTime] = useState(0) // Initial time set to 0 seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [key, setKey] = useState(0) // Key for resetting CountdownCircleTimer

  useEffect(() => {
    if (!isTimerRunning) {
      // Reset the timer when it's not running
      setKey((prevKey) => prevKey + 1) // Change key to trigger reset
    }
  }, [isTimerRunning])

  const formatTime = (remainingTime) => {
    const mins = Math.floor(remainingTime / 60)
    const secs = remainingTime % 60
    const formattedMinutes = mins < 10 ? `0${mins}` : mins
    const formattedSeconds = secs < 10 ? `0${secs}` : secs
    return `${formattedMinutes}:${formattedSeconds}`
  }

  const handleTimerClick = () => {
    const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds)
    if (isNaN(totalSeconds) || totalSeconds <= 0) {
      Alert.alert('Please enter a valid time.')
      return
    }
    setTime(totalSeconds)
    setIsTimerRunning(true)
  }

  const handleTimerComplete = () => {
    // Show pop-up when timer runs out
    Alert.alert('Time is up!')
    setIsTimerRunning(false)
  }

  const handleMinutesChange = (text) => {
    if (/^\d+$/.test(text) || text === '') {
      setMinutes(text)
    }
  }

  const handleSecondsChange = (text) => {
    const value = parseInt(text)
    if (/^\d+$/.test(text) || text === '') {
      if (value >= 0 && value <= 59) {
        setSeconds(text)
      } else if (text === '') {
        setSeconds('')
      } else {
        Alert.alert('Please enter a valid number of seconds (0-59).')
      }
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CountdownCircleTimer
        key={key} // Ensure re-rendering when key changes to reset timer
        isPlaying={isTimerRunning}
        duration={time}
        onComplete={handleTimerComplete}
        size={200}
        strokeWidth={12}
        colors={['#004777']}
      >
        {({ remainingTime }) => (
          <View>
            <Text style={{ fontSize: 36 }}>{formatTime(remainingTime)}</Text>
          </View>
        )}
      </CountdownCircleTimer>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <TextInput
          placeholder='Minutes'
          keyboardType='numeric'
          style={{ borderBottomWidth: 1, width: 100, textAlign: 'center' }}
          value={minutes}
          onChangeText={handleMinutesChange}
          editable={!isTimerRunning}
        />
        <Text>:</Text>
        <TextInput
          placeholder='Seconds'
          keyboardType='numeric'
          style={{ borderBottomWidth: 1, width: 100, textAlign: 'center' }}
          value={seconds}
          onChangeText={handleSecondsChange}
          editable={!isTimerRunning}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button title='Start Timer' onPress={handleTimerClick} disabled={isTimerRunning} />
      </View>
    </View>
  )
}

export default CountdownTimer
