import { Text, View } from 'react-native'

export default function SongProgress({ progress, total }: { progress: number; total: number }) {
  // Start by generating the minutes to display before bar
  let ratioTime: number = progress / total // To find ratio of the progress bar itself.
  let progMinute: number = 0
  let progSecond: number = progress ? progress : 0

  let totalMinute: number = 0
  let totalSecond: number = total ? total : 0

  // Convert the progress and total seconds to minutes + seconds remainder. Mod60
  while (progSecond > 60) {
    progMinute++
    progSecond -= 60 // Care if single digit, convert to string maybe? Find out right now.
  }

  while (totalSecond > 60) {
    totalMinute++
    totalSecond -= 60
  }

  let pSecondString: string = ''
  let tSecondString: string = '' // These are for displaying trailing zero
  
  if (progSecond < 10) {
    pSecondString = '0'
  }
  
  if (totalSecond < 10) {
    tSecondString = '0'
  }
  
  pSecondString += progSecond.toString()
  tSecondString += totalSecond.toString()

  // If isPlaying, do math, otherwise don't do anything.
  // Only gets called when isPlaying so we're fine.

  // Add progress bar to the right of it. Shouldn't be anything too insane I'd imagine.
  // Just find a way to set total length, then give left bar played/total * total and the right bar 1-leftBarWidth

  // 300 is total width of widget
  let leftBarWidth: number = Math.floor(ratioTime * 300)
  let rightBarWidth: number = Math.ceil((1 - ratioTime) * 300)

  // Stretch goal: Match color scheme of album playing
  return (
    <View style={{ width: 300, flexDirection: 'column' }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ backgroundColor: '#CACACA', height: 5, width: leftBarWidth }}></View>
      </View>
      <View style={{ flexDirection: 'row', alignContent: 'center' }}>
        <View style={{ width: 150 }}>
          <Text style={{ alignSelf: 'flex-start' }}>
            {progMinute}:{pSecondString}
          </Text>
        </View>
        <View style={{ width: 150 }}>
          <Text style={{ alignSelf: 'flex-end' }}>
            {totalMinute}:{tSecondString}
          </Text>
        </View>
      </View>
    </View>
  )
}
