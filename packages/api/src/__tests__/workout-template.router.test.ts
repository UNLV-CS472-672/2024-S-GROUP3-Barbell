import { describe, expect, it } from 'vitest'

import { createCaller, RouterInputs } from '../..'
import { createContextInner } from '../trpc'

describe('WORKOUT-TEMPLATE', async () => {
  const ctx = await createContextInner()
  const caller = createCaller(ctx)

  const input: RouterInputs['post']['create'] = {
    // title: 'Another Post',
    content: 'This is.',
    authorId: 1,
  }

  it('/getAllWorkoutTemplatesByUserId', async () => {
    const create = await caller.workoutTemplate.getAllWorkoutTemplatesByUserId({ userId: 1 })
    expect(create).toBeDefined()
  })

  it('getWorkoutTemplateInfoById', async () => {
    const create = await caller.workoutTemplate.getWorkoutTemplateInfoById({ id: 1 })
    expect(create).toBeDefined()
    await caller.workoutTemplate.getWorkoutTemplateInfoById({ id: 1232 })
  })
})
