import { describe, expect, it } from 'vitest'

import { prisma } from '@acme/db'

import { createCaller, RouterInputs } from '../..'
import { createContextInner } from '../trpc'

describe('EXERCISE', async () => {
  const ctx = await createContextInner()
  const caller = createCaller(ctx)

  const input: RouterInputs['exercise']['getExerciseFromExerciseId'] = {
    id: 1,
  }

  const input2: RouterInputs['exercise']['deleteExerciseFromExerciseID'] = {
    id: 1,
  }

  it('/getAllExercises', async () => {
    const all = await caller.exercise.getAllExercises()

    expect(all).toBeDefined()
  })

  it('/getExerciseFromExerciseId', async () => {
    const exercise = await caller.exercise.getExerciseFromExerciseId(input)

    expect(exercise).toBeDefined()
  })

  it('/deleteExerciseFromExerciseID', async () => {
    const exerciseCreate = await prisma.exercise.create({
      data: {
        name: 'Exercise',
        note: 'Note',
        userId: 1,
        bodyPart: 'CHEST',
        category: 'BARBELL',
      },
    })

    const exercise = await caller.exercise.deleteExerciseFromExerciseID({ id: exerciseCreate.id })
    expect(exercise).toBeDefined()
  })
})
