import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import TimeAgo from '~/components/timeAgo/TimeAgo'
import { api } from '~/utils/trpc/api'

interface WorkoutProps {
  workout: any
  username: string
}

interface ProfileWorkoutsProps {
  id: number
  username: string
  workoutCount: number
}

export default function ProfileWorkouts({ id, username, workoutCount }: ProfileWorkoutsProps) {
  const workoutAmount = 5
  const [pageIndex, setPostIndex] = useState<number>(1)
  const { data, isFetching } = api.user.getUserWorkoutHistoryPaginated.useQuery({
    id: id,
    workouts: workoutAmount,
    page: pageIndex,
  })

  const [workouts, setWorkouts] = useState<any>()

  useEffect(() => {
    if (data !== undefined) {
      setWorkouts((existingWorkouts: any) => {
        if (existingWorkouts === undefined) {
          return data
        } else {
          // Create a set of existing post IDs
          const existingPostIds = new Set(existingWorkouts.map((post: any) => post.id))

          // Filter out duplicate posts from data
          const newData = data.filter((post: any) => !existingPostIds.has(post.id))

          // Concatenate new posts to the existing posts
          return [...existingWorkouts, ...newData]
        }
      })
    }
  }, [data])

  const MoreButton = () => {
    return isFetching ? (
      <View className='my-10 h-[50px] items-center justify-center'>
        <RotatingBarbellIcon />
      </View>
    ) : workouts?.length != workoutCount ? (
      <View className='my-10 h-[50px] items-center justify-center'>
        <Text className='text-center text-[#8987d4]' onPress={() => setPostIndex(pageIndex + 1)}>
          More
        </Text>
      </View>
    ) : (
      <View className='my-10 h-[50px] items-center justify-center'>
        <Text className='text-center text-[#424242]'>
          {workoutCount == 0 ? 'No workouts to show' : 'All workouts loaded'}
        </Text>
      </View>
    )
  }

  data?.forEach((i) => {
    console.log(i.workoutTemplate)
  })

  return (
    <View className='flex-1'>
      {workouts &&
        workouts.map((workout: any) => (
          <View
            className='text-bb-slate-100 mx-3 p-3'
            key={workout.id}
            style={{ borderBottomWidth: 1, borderBottomColor: '#737272' }}
          >
            <View className='flex-row items-start justify-between'>
              <Text className='text-xl font-bold text-slate-200'>{username}</Text>
              <TimeAgo createdAt={workout.finishedAt}></TimeAgo>
            </View>
            <Text className='font-bold text-[#8987d4]'>{workout.workoutTemplate.name}</Text>
            <Text className='mt-1 text-slate-200'>{workout.workoutTemplate.description}</Text>
          </View>
        ))}
      <MoreButton />
    </View>
  )
}
