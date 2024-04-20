const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor(time / 60) % 60
  const seconds = time % 60

  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

  // time format is hh:mm:ss when hours is greater than 0, else mm:ss
  if (hours) return `${hours}:${formattedMinutes}:${formattedSeconds}`
  return `${minutes}:${formattedSeconds}`
}

export const formatForWorkoutCompletion = (time: number) => {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor(time / 60) % 60
  const seconds = time % 60

  if (hours) return `${hours}h ${minutes}m ${seconds}s`
  if (minutes) return `${minutes}m ${seconds}s`
  return `${seconds}s`
}

export default formatTime
