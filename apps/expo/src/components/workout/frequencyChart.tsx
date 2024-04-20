import { LineChart } from 'react-native-chart-kit' // Use to plot the data
import { View, SafeAreaView, Text } from 'react-native'
import { router } from 'expo-router'
import { api } from '~/utils/trpc/api'


export default function WorkoutFrequencyGraph({userid}: {userid: number}){
    // Main steps go:
    //  1) Get data
    //  2) Parse it and store it
    //  3) return the graph itself to render it

    // Now render components and return it

    // What function? We need to get all workouts completed for a particular userID
    //  Made a new one that reutnrs workoutLogs in ascneindg order by date finsihed
    const workouts = api.workoutLog.getWorkoutLogsByUserID.useQuery({userId: userid});
    // Just debugging
    console.log("Workouts retrieved were: ", workouts);


    return(
        <Text>Just testing the line charts for now.</Text>
    )

}