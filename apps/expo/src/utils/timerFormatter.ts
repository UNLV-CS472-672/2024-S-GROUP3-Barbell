const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor(time / 60) % 60
    const seconds = time % 60
    return hours
      ? `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${
          seconds < 10 ? `0${seconds}` : seconds
        }`
      : `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
  }

export default formatTime