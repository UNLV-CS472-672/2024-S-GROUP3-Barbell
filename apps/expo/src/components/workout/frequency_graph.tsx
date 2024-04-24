import React from 'react'
import {Text, View, Dimensions} from 'react-native'

// Using the new chart library to see how it looks.
// Properties: https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/blob/HEAD/docs/LineChart/LineChartProps.md
import {LineChart} from 'react-native-gifted-charts'

// To get the user's data, in particular the WorkoutLogs
import { api } from '~/utils/trpc/api'
import RotatingBarbellIcon from '../notif/RotatingBarbellIcon'


// Just use react-native-chart-kit to display the user's workout across each month for current year.
export default function DisplayWorkoutFrequencyGraph({userID} : {userID: number}){
    let values = [
        {value: 0, label: "Jan"},
        {value: 0, label: "Feb"},
        {value: 0, label: "Mar"},
        {value: 0, label: "Apr"},
        {value: 5, label: "May"},
        {value: 7, label: "Jun"},
        {value: 4, label: "Jul"},
        {value: 3, label: "Aug"},
        {value: 2, label: "Sep"},
        {value: 1, label: "Oct"},
        {value: 2, label: "Nov"},
        {value: 6, label: "Dec"},
    ]

    const screenWidth = Dimensions.get("screen").width * 0.7
    const screenHeight = Dimensions.get("screen").height * 0.2

    const {data: logData, isFetching} = api.user.getUserWorkoutHistory.useQuery({userId: userID});

    const currYear = new Date().getFullYear()
    if(!(logData===undefined)){
        for(let i = 0; i < logData!.workoutHistory.length; i++){
            let year = logData!.workoutHistory[i]!.finishedAt.getFullYear()
            if(year===currYear){
                // Valid log, check month and increment
                let month:number = logData!.workoutHistory[i]!.finishedAt.getMonth() // Starts at 0 indexing for Jan
                values[month]!.value++
            }
        }
    }
    // Find max value to make graph more dynamic
    let max = 0
    for(let i = 0; i < 12; i++){
        if(max < values[i]!.value){
            max = values[i]!.value
        }
    }

    return(
        <View>{isFetching ? <View><RotatingBarbellIcon /></View> : 
            <>
            <Text>Line Chart for User: {userID}</Text>
            <LineChart 
                rotateLabel={true}
                curved
                hideRules
                curvature={0.2}
                data={values}
                height={screenHeight}
                width={screenWidth}
                spacing={25}
                adjustToWidth={true}
                startFillColor="#FFFFFF"
                startOpacity={0.75}
                endOpacity={0.1}
                thickness={2.5}
                color={"#FFFFFF"}
                backgroundColor={"#48476D"}
                dataPointsColor={"#FFFFFF"}
                dataPointsRadius={4}
                yAxisColor={"#48476D"}
                xAxisColor={"#48476D"}
                maxValue={max+5}
                
            />
            </>
}
        </View>
    )
}