import { describe, expect, it } from 'vitest'

import { prisma } from '@acme/db'

import { createCaller, RouterInputs } from '../..'
import { createContextInner } from '../trpc'

describe('WORKOUT-LOG', async () => {
  const ctx = await createContextInner()
  const caller = createCaller(ctx)

  const input: RouterInputs['workoutLog']['createNewWorkoutLog'] = {
    userId: 1,
    duration: 1,
    workoutTemplateId: 1,
  }

  const input2: RouterInputs['workoutLog']['createNewWorkoutLogAndUpdateValues'] = {
    userId: 1,
    duration: 1,
    workoutData: {
      exercises: [
        {
          id: 1,
          sets: [
            {
              id: '1',
              reps: [1],
              exerciseId: 1,
              type: 'FAILURE',
              weight: [1],
            },
          ],
          bodyPart: 'ARMS',
          category: 'BARBELL',
          name: 'name',
        },
      ],
      workoutName: 'workoutName',
      workoutTemplateId: 1,
    },
  }

  const input3: RouterInputs['workoutLog']['getActivityFeedWorkouts'] = {
    count: 1,
    friendIds: [1],
  }

  it('/createNewWorkoutLog', async () => {
    const create = await caller.workoutLog.createNewWorkoutLog(input)
    expect(create).toBeDefined()

    // cleanup
    await prisma.workoutLog.delete({ where: { id: create.id } })
  })

  it('/createNewWorkoutLogAndUpdateValues', async () => {
    const create = await caller.workoutLog.createNewWorkoutLogAndUpdateValues(input2)
    expect(create).toBeDefined()

    // cleanup
    await prisma.workoutLog.delete({ where: { id: create.id } })
  })

  it('/getActivityFeedWorkouts', async () => {
    const create = await caller.workoutLog.getActivityFeedWorkouts(input3)
    expect(create).toBeDefined()
  })
})
