import React from 'react'
import {Text, View, Dimensions} from 'react-native'

// Import bezier line graph from newly installed react-native-chart-kit library
// Documentation: https://www.npmjs.com/package/react-native-chart-kit
import { LineChart } from 'react-native-chart-kit'
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors'
import { Line } from 'react-native-svg'

// To get the user's data, in particular the WorkoutLogs
import { api } from '~/utils/trpc/api'

const chartConfig = {
    backgroundGradientFrom: "#48476D",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#48476D",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

// Just use react-native-chart-kit to display the user's workout across each month for current year.
export default function DisplayWorkoutFrequencyGraph({userID} : {userID: number}){
    // Start by getting the current year. Shouldn't be too hard, just use date time
    // Query the entirety of it and just store the value


    // Psuedocode:
    //  For object in returned data
    //      Parse month and year
    //      if year == currentYear:
    //          switch(month) monthValue++;
    // That populates the below values.

    // Test with random data: Currently april so uh go up until april
    const values = [33, 12, 23, 5, 16, 34, 20, 13, 7, 0, 0, 0]
    const screenWidth = Dimensions.get("screen").width * 0.9
    const screenHeight = Dimensions.get("screen").height * 0.25

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
            />
        </View>
    )
}