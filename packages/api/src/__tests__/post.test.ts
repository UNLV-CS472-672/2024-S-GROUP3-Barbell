import type { inferProcedureInput } from '@trpc/server'

import { createCaller, RouterInputs, RouterOutputs } from '../..'
import { AppRouter } from '../root'
import { createContextInner } from '../trpc'
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe('POST', async () => {
  const ctx = await createContextInner({})
  const caller = createCaller(ctx)

  /* Do this */
  // const input: inferProcedureInput<AppRouter['post']['create']> = {

  //   title: 'First Post',
  //   content: 'This is the content of the first post.',
  // }

  /* Or this */
  const input: RouterInputs['post']['create'] = {
    title: 'First Post',
    content: 'This is the content of the first post.',
  }

  const input2: RouterInputs['post']['create'] = {
    title: 'Another Post',
    content: 'This is.',
  }


  it('/byId && /create', async () => {
    const byId = await caller.post.byId({ id: 1 })
    const create = await caller.post.create(input2)

    expect(byId).toMatchObject(input)
    expect(create).toMatchObject(input2)
  })
})
