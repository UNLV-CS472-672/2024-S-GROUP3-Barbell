import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import { BodyPart, Category, SetType } from '@prisma/client'
import { z } from 'zod'

import { prisma } from '@acme/db'

test('EXERCISE /createNewExercise', async () => {
  const exerciseInput = {
    id: 14,
    name: 'Push-up',
    note: 'Do 3 sets of 10',
    body_part: BodyPart.CHEST,
    category: Category.CARDIO,
    workoutId: 1,
  }

  const exercise = await prisma.exercise.upsert({
    where: {
      id: exerciseInput.id,
    },
    update: {
      name: exerciseInput.name,
      note: exerciseInput.note,
      body_part: exerciseInput.body_part,
      category: exerciseInput.category,
      workoutId: exerciseInput.workoutId,
    },
    create: {
      id: exerciseInput.id,
      name: exerciseInput.name,
      note: exerciseInput.note,
      body_part: exerciseInput.body_part,
      category: exerciseInput.category,
      workoutId: exerciseInput.workoutId,
    },
  })

  expect(exercise).toBeDefined()
  expect(exercise.id).toBe(exerciseInput.id)
})

test('EXERCISE /getAllExercises', async () => {
  const exercises = await prisma.exercise.findMany()

  expect(exercises).toBeDefined()
  expect(exercises.length).toBeGreaterThan(0)
})

test('EXERCISE /getExerciseFromExerciseId', async () => {
  const exercise = await prisma.exercise.findFirst({ where: { id: 1 } })

  expect(exercise).toBeDefined()
  expect(exercise?.id).toBe(1)
})

test('EXERCISE /updateExerciseFromExericseID', async () => {
  const exerciseInput = {
    id: 1,
    name: 'Push-up',
    note: 'Do 3 sets of 10',
    body_part: BodyPart.CHEST,
    category: Category.CARDIO,
    workoutId: 1,
  }

  const exercise = await prisma.exercise.update({
    where: {
      id: exerciseInput.id,
    },
    data: {
      name: exerciseInput.name,
      note: exerciseInput.note,
      body_part: exerciseInput.body_part,
      category: exerciseInput.category,
      workoutId: exerciseInput.workoutId,
    },
  })

  expect(exercise).toBeDefined()
  expect(exercise.id).toBe(exerciseInput.id)
})

test('EXERCISE /deleteExerciseFromExerciseID', async () => {
  // delete all sets associated with the exercise
  await prisma.set.deleteMany({ where: { exerciseId: 1 } });

  // as then we can delete the exercise
  const exercise = await prisma.exercise.delete({ where: { id: 1 } });

  expect(exercise).toBeDefined();
  expect(exercise.id).toBe(1);
});


test('EXERCISE /getAllSetsFromExerciseID', async () => {
  const sets = await prisma.set.findMany({ where: { exerciseId: 6 } })

  expect(sets).toBeDefined()
  expect(sets.length).toBeGreaterThan(0)
})
