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

/*  */
test('WORKOUT /getAllWorkouts', async () => {
  const workouts = await prisma.workout.findMany()

  expect(workouts).toBeDefined()
  expect(workouts.length).toBeGreaterThan(0)
})

/*  */
test('WORKOUT /updateWorkout', async () => {
  const workoutInput = {
    id: 69,
    name: 'Test Workout',
    description: 'A test workout description',
    duration: 60,
    finishedAt: new Date(),
    likes: 0,
    exercises: [
      {
        id: 1,
        name: 'Test Exercise',
        note: 'Test note',
        body_part: 'LEGS',
        category: 'BARBELL',
      },
    ],
    userId: 1,
  }

  const updatedWorkout = await prisma.workout.update({
    where: {
      id: workoutInput.id,
    },
    data: {
      name: workoutInput.name,
      description: workoutInput.description,
      duration: workoutInput.duration,
      finishedAt: workoutInput.finishedAt,
      likes: workoutInput.likes,
      userId: workoutInput.userId,
    },
  })

  expect(updatedWorkout).toBeDefined()
  expect(updatedWorkout.id).toBe(workoutInput.id)
})

/*  */
test('WORKOUT /deleteWorkoutFromWorkoutId', async () => {
  const workout = await prisma.workout.create({
    data: {
      name: 'Test Workout',
      description: 'A test workout description',
      duration: 60,
      finishedAt: new Date(),
      likes: 0,
      userId: 1,
    },
  })

  const deletedWorkout = await prisma.workout.delete({
    where: {
      id: workout.id,
    },
  })

  expect(deletedWorkout).toBeDefined()
  expect(deletedWorkout.id).toBe(workout.id)
})

/*  */
test('WORKOUT /getAllExercisesFromWorkoutID', async () => {
  const workout = await prisma.workout.findFirst({})
  const exercises = await prisma.exercise.findMany({
    where: {
      workoutId: workout?.id,
    },
  })

  expect(exercises).toBeDefined()
  expect(exercises.length).toBeGreaterThanOrEqual(0)
})

test('WORKOUT /deleteExerciseFromWorkout', async () => {
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

  const exercise = await prisma.exercise.findFirst({
    where: {
      workoutId: workout.id,
    },
  })

  if (exercise) {
    const updatedWorkout = await prisma.workout.update({
      where: {
        id: workout.id,
      },
      data: {
        exercises: {
          disconnect: {
            id: exercise.id,
          },
        },
      },
    })
    expect(updatedWorkout).toBeDefined()
    expect(updatedWorkout.id).toBe(workout.id)
  }
})
