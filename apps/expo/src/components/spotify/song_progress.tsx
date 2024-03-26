import { View, Text } from "react-native";


export default function SongProgress({progress, total}: {progress: number, total: number}){
    // Start by generating the minutes to display before bar
    let ratioTime: number = progress/total // To find ratio of the progress bar itself.
    let progMinute: number = 0
    let progSecond: number = progress? progress : 0

    let totalMinute: number = 0
    let totalSecond: number = total? total : 0

    // Convert the progress and total seconds to minutes + seconds remainder. Mod60
    while(progSecond > 60){
        progMinute++
        progSecond-=60 // Care if single digit, convert to string maybe? Find out right now.
    }
    while(totalSecond > 60){
        totalMinute++
        totalSecond-=60
    }

    // If isPlaying, do math, otherwise don't do anything.
    // Only gets called when isPlaying so we're fine.

    // Add progress bar to the right of it. Shouldn't be anything too insane I'd imagine.
    // Just find a way to set total length, then give left bar played/total * total and the right bar 1-leftBarWidth
    let leftBarWidth: number = ratioTime
    let rightBarWidth: number = 1-ratioTime
    
    return(
        <View>
            <Text>{progMinute}:{progSecond}/{totalMinute}:{totalSecond}</Text>
            <Text>Ratio is: {leftBarWidth} to {rightBarWidth}</Text>
        </View>
    )
    
}