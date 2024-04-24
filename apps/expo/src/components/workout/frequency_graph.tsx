import React from 'react'
import {Text, View, Dimensions} from 'react-native'

// Import bezier line graph from newly installed react-native-chart-kit library
// Documentation: https://www.npmjs.com/package/react-native-chart-kit
import { LineChart } from 'react-native-chart-kit'
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors'
import { Line } from 'react-native-svg'

// To get the user's data, in particular the WorkoutLogs
import { api } from '~/utils/trpc/api'
import RotatingBarbellIcon from '../notif/RotatingBarbellIcon'

enum MONTHS {
    JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC
}


// Just use react-native-chart-kit to display the user's workout across each month for current year.
export default function DisplayWorkoutFrequencyGraph({userID} : {userID: number}){

    const chartConfig = {
        backgroundGradientFrom: "#48476D",
        backgroundGradientTo: "#48476D",
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        propsForBackgroundLines: {
    
        }
    };
    let values = new Array<number>(12).fill(0);

    const screenWidth = Dimensions.get("screen").width * 0.9
    const screenHeight = Dimensions.get("screen").height * 0.3

    // Psuedocode:
    //  For object in returned data
    //      Parse month and year
    //      if year == currentYear:
    //          switch(month) monthValue++;
    // That populates the below values.

    // Start by getting the current year. Shouldn't be too hard, just use date time
    // Query the entirety of it and just store the value

    const {data: logData, isFetching} = api.user.getUserWorkoutHistory.useQuery({userId: userID});

    const currYear = new Date().getFullYear()
    if(!(logData===undefined)){
        for(let i = 0; i < logData!.workoutHistory.length; i++){
            let year = logData!.workoutHistory[i]!.finishedAt.getFullYear()
            if(year===currYear){
                // Valid log, check month and increment
                let month:number = logData!.workoutHistory[i]!.finishedAt.getMonth() // Starts at 0 indexing for Jan
                values[month]++
            }
        }
    }
    
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"," Dec"],
        datasets: [
            {
                data: values,
                color: (opacity = 1 ) => `rgba(255, 255, 255, ${opacity})`, // Optional
                strokeWidth: 3
            }
        ],
    };

    return(
        <View>{isFetching ? <View><RotatingBarbellIcon /></View> : 
            <>
            <Text>Line Chart for User: {userID}</Text>
            <LineChart 
                data = {data}
                width = {screenWidth}
                height = {screenHeight}
                verticalLabelRotation={55}
                chartConfig={chartConfig}
                withShadow={false}
                withInnerLines={false}
                segments={5}
                fromZero={true}
                yLabelsOffset={15}
                xLabelsOffset={-10}
            />
            </>
}
        </View>
    )
}