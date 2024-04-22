import React from 'react'
import {Text, View, Dimensions} from 'react-native'

// Import bezier line graph from newly installed react-native-chart-kit library
// Documentation: https://www.npmjs.com/package/react-native-chart-kit
import { LineChart } from 'react-native-chart-kit'
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors'
import { Line } from 'react-native-svg'

// To get the user's data, in particular the WorkoutLogs
import { api } from '~/utils/trpc/api'


// Just use react-native-chart-kit to display the user's workout across each month for current year.
export default function DisplayWorkoutFrequencyGraph({userID} : {userID: number}){
    // Start by getting the current year. Shouldn't be too hard, just use date time
    // Query the entirety of it and just store the value

    const chartConfig = {
        backgroundGradientFrom: "#48476D",
        backgroundGradientTo: "#48476D",
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        propsForBackgroundLines: {
    
        }
    };
    

    // Psuedocode:
    //  For object in returned data
    //      Parse month and year
    //      if year == currentYear:
    //          switch(month) monthValue++;
    // That populates the below values.

    // Test with random data: Currently april so uh go up until april
    const values = [33, 12, 23, 5, 16, 34, 20, 13, 7, 3, 5, 13]
    const screenWidth = Dimensions.get("screen").width * 0.9
    const screenHeight = Dimensions.get("screen").height * 0.3

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
        <View>
            <Text>Line Chart for User: {userID}</Text>
            <LineChart 
                data = {data}
                width = {screenWidth}
                height = {screenHeight}
                verticalLabelRotation={45}
                chartConfig={chartConfig}
                withShadow={false}
                withInnerLines={false}
                segments={5}
                fromZero={true}
                yLabelsOffset={15}
                xLabelsOffset={0}
                style={{
                    
                }}
            />
        </View>
    )
}