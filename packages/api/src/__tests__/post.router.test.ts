import { describe, expect, it } from 'vitest'

import { createCaller, RouterInputs } from '../..'
import { createContextInner } from '../trpc'

describe('POST', async () => {
  const ctx = await createContextInner()
  const caller = createCaller(ctx)

  const input: RouterInputs['post']['create'] = {
    content: 'This is.',
    authorId: 1
  }

  it('/byId', async () => {
    const create = await caller.post.create(input)
    const byId = await caller.post.byId({ id: create.id })

    expect(create.content).toMatchObject(input.content)
    expect(create.authorId).toMatchObject(input.authorId)

    expect(byId?.content).toMatchObject(input.content)
    expect(byId?.authorId).toMatchObject(input.authorId)

    const all = await caller.post.all()
    const delete_post = await caller.post.delete({ id: create.id })

    expect(all).toBeDefined()
    expect(delete_post).toMatchObject(create)
  })

  it('/create', async () => {
    const create = await caller.post.create(input)
    expect(create).toBeDefined()

    // cleanup
    await caller.post.delete({ id: create.id })
  })

  it('/all', async () => {
    const all = await caller.post.all()
    expect(all).toBeDefined()
  })

  it('/delete', async () => {
    const create = await caller.post.create(input)
    const delete_post = await caller.post.delete({ id: create.id })

    expect(delete_post).toMatchObject(create)
  })

  it('/getRecentPostsByUserIdAndPostCount', async () => {
    const create = await caller.post.getRecentPostsByUserIdAndPostCount({ id: 1, postCount: 1 })
    expect(create).toBeDefined()
  })
})