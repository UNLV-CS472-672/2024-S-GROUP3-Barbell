import { describe, expect, it } from 'vitest'

import { createCaller, RouterInputs } from '../..'
import { createContextInner } from '../trpc'

describe('NOTIFICATION', async () => {
  const ctx = await createContextInner()
  const caller = createCaller(ctx)

  const input: RouterInputs['notif']['getMessagesFromChatIdAndChatType'] = {
    // title: 'Another Post',
    id: 1,
    type: 'DIRECT',
    user1Id: 1,
    user2Id: 2,
  }

  const input2: RouterInputs['notif']['getMessagesFromChatIdAndChatType'] = {
    // title: 'Another Post',
    id: 696969,
    type: 'DIRECT',
    user1Id: 1,
    user2Id: 2,
  }

  it('/getMessagesFromChatIdAndChatType', async () => {
    const create = await caller.notif.getMessagesFromChatIdAndChatType(input)
    expect(create).toBeDefined()

    const create2 = await caller.notif.getMessagesFromChatIdAndChatType(input2)
    expect(create2).toBeDefined()
  })
})
