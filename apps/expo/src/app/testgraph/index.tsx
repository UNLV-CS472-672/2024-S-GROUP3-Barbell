import WorkoutFrequencyGraph from '~/components/workout/frequencyChart';

import {View, Text, Button} from 'react-native'

import { GlobalContext } from "~/context/global-context";

import { api } from '~/utils/trpc/api';

// This file is literally just to test out the graph and make sure it works
// It just renders the button and calls it a day



export default function GraphScreen(){
    // // Just testing out the new WorkoutLog api
    // const {singleLog} = api.workoutLog.getWorkoutLogByID.useQuery({id: 1});
    // // Testing multiple logs
    // const {multipleLogs} = api.workoutLog.getWorkoutLogsByUserID.useQuery({userId: 1})

    // // Creating test workoutLog
    // const {mutate, error } = api.workoutLog.createNewWorkoutLog.useMutation({
    //     async onSuccess(){
    //         console.log("New workout log created")
    //     },
    //     async onError(){
    //         console.log(error)
    //     }
    // })
    // const createWorkoutLog = async() => {
    //     mutate({
    //         duration: 0,
    //         userId: 5,
    //         workoutTemplateId: 1
    //     })
    // }

    // const updateLog = api.workoutLog.updateWorkoutLog.useMutation()
    // const handleUpdate = () => {
    //     updateLog.mutate({
    //         id: 19,
    //         finishedAt: new Date(),
    //         duration: 340,
    //     })
    // }

    // Actual stuff now. Just invoke the graph thingy.
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Testing testing</Text>
            <WorkoutFrequencyGraph userid={2}/>
        </View>
    )
}