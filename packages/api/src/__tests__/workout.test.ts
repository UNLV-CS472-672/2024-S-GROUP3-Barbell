import { expect, test } from '@jest/globals'

import { prisma } from '@acme/db'

/*  */
test('WORKOUT /createNewWorkout', async () => {
  const workoutInput = {
    id: 69,
    name: 'Test Workout',
    description: 'A test workout description',
    duration: 60,
    finishedAt: new Date(),
    exercises: [
      {
        name: 'Test Exercise',
        note: 'Test note',
        body_part: 'LEGS',
        category: 'BARBELL',
      },
    ],
    userId: 1,
  }


  const workout = await prisma.workout.upsert({
    where: {
      id: workoutInput.id,
    },
    update: {
      name: workoutInput.name,
      description: workoutInput.description,
      duration: workoutInput.duration,
      finishedAt: workoutInput.finishedAt,
      likes: 0,
      userId: workoutInput.userId,
    },
    create: {
      id: workoutInput.id,
      name: workoutInput.name,
      description: workoutInput.description,
      duration: workoutInput.duration,
      finishedAt: workoutInput.finishedAt,
      likes: 0,
      userId: workoutInput.userId,
    },
  })
  

  expect(workout).toBeDefined()
  expect(workout.id).toBe(workoutInput.id)
})
