import { api } from '~/utils/api'
import { SafeAreaView, Button } from 'react-native'
import { BodyPart } from '@prisma/client'
import { Category } from '@prisma/client'


const Test: React.FC = () =>{

    const { mutate,error } = api.workout.createNewWorkout.useMutation({
        async onSuccess() {
            console.log('Exercise created')
        },
        async onError(){
            console.log(error)
        }
    })

    const createWorkout = async () => {
        mutate({
            name: 'test workout',
            description: "Amazing best workout",
            duration: 140,
            finishedAt: new Date(),
            exercises: [
                {
                id: 1,
                },
                {
                id: 2,
                },
                {
                id: 3,
                },
                {
                id: 4,
                },
                {
                id: 5,
                },
                {
                id: 6,
                },
            ],
            userId: 1
        })
    }

    return <SafeAreaView>
        <Button title="Create Workout" onPress={createWorkout}/>
    </SafeAreaView>

}

export default Test
