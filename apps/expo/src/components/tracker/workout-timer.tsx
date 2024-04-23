import { useEffect } from 'react'
import { Text, View } from 'react-native'

import formatTime from '~/utils/timerFormatter'

export interface IWorkoutTimerProps {
  time: number
  setTime: React.Dispatch<React.SetStateAction<number>>
}

const WorkoutTimer: React.FC<IWorkoutTimerProps> = ({ time, setTime }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <View>
      <Text className='font-bold text-slate-200'>{formatTime(time)}</Text>
    </View>
  )
}

export default WorkoutTimer
