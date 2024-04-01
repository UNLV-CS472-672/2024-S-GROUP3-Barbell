import type { inferProcedureInput } from '@trpc/server'

import { createCaller, RouterInputs, RouterOutputs } from '../..'
import { AppRouter } from '../root'
import { createContextInner } from '../trpc'
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe('USER', async () => {
  const ctx = await createContextInner({})
  const caller = createCaller(ctx)

  /* Do this */
  // const input: inferProcedureInput<AppRouter['post']['create']> = {

  //   title: 'First Post',
  //   content: 'This is the content of the first post.',
  // }

  /* Or this */
  const input: RouterInputs['user']['byId'] = {
    id: 1,
  }

  const input2: RouterInputs['post']['create'] = {
    title: 'Another Post',
    content: 'This is.',
  }


  it('/byId && /create', async () => {
    const byId = await caller.user.byId({ id: 1 })
    const create = await caller.post.create(input2)

    expect(byId).toMatchObject(input)
  })
})
