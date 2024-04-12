import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

import formatTime from '~/utils/timerFormatter'

const WorkoutTimer: React.FC = () => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <View>
      <Text className="font-bold text-slate-200">{formatTime(time)}</Text>
    </View>
  )
}

export default WorkoutTimer
