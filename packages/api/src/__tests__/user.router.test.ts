import { describe, expect, it } from 'vitest'

import { createCaller, RouterInputs } from '../..'
import { createContextInner } from '../trpc'

describe('USER', async () => {
  const ctx = await createContextInner()
  const caller = createCaller(ctx)

  /* Or this */
  const input: RouterInputs['user']['byId'] = {
    id: 1,
  }

  it('/byId && /create', async () => {
    const byId = await caller.user.byId({ id: 1 })

    expect(byId?.id).toMatchObject(input.id)
  })
})
