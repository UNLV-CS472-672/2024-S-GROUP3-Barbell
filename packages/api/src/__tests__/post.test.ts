import type { inferProcedureInput } from '@trpc/server'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { createCaller, RouterInputs, RouterOutputs } from '../..'
import { AppRouter } from '../root'
import { createContextInner } from '../trpc'

describe('POST', async () => {
  const ctx = await createContextInner({})
  const caller = createCaller(ctx)

  const input: RouterInputs['post']['create'] = {
    title: 'Another Post',
    content: 'This is.',
  }

  it('/byId && /create', async () => {
    const create = await caller.post.create(input)
    const byId = await caller.post.byId({ id: create.id })
    
    expect(create.title).toMatchObject(input.title)
    expect(create.content).toMatchObject(input.content)

    expect(byId?.title).toMatchObject(input.title)
    expect(byId?.content).toMatchObject(input.content)

    const all = await caller.post.all()
    const delete_post = await caller.post.delete({ id: create.id })
    
    expect(all).toBeDefined()
    expect(delete_post).toMatchObject(create)
  })
})