import { describe, expect, it } from 'vitest'

import { createCaller, RouterInputs } from '../..'
import { createContextInner } from '../trpc'

describe('NOTIFICATION', async () => {
  const ctx = await createContextInner()
  const caller = createCaller(ctx)

  const input: RouterInputs['notif']['getMessagesFromChatIdAndChatType'] = {
    id: 1,
    type: 'DIRECT',
    user1Id: 1,
    user2Id: 2,
  }

  const input2: RouterInputs['notif']['getMessagesFromChatIdAndChatType'] = {
    id: 696969,
    type: 'DIRECT',
    user1Id: 1,
    user2Id: 2,
  }

  const input3: RouterInputs['notif']['markChatAsReadByChatIdAndUserIdAndChatType'] = {
    chatId: 1,
    type: 'GROUP',
    userId: 1,
  }

  const input4: RouterInputs['notif']['getMessagePreviewsFromUserIdAndChatType'] = {
    id: 1,
    type: 'GROUP',
  }

  it('/getMessagesFromChatIdAndChatType', async () => {
    const create = await caller.notif.getMessagesFromChatIdAndChatType(input)
    expect(create).toBeDefined()

    const create2 = await caller.notif.getMessagesFromChatIdAndChatType(input2)
    expect(create2).toBeDefined()
  })

  it('/markChatAsReadByChatIdAndUserIdAndChatType', async () => {
    const create = await caller.notif.markChatAsReadByChatIdAndUserIdAndChatType(input3)
    expect(create).toBeDefined()
  })

  it('/getMessagePreviewsFromUserIdAndChatType', async () => {
    const create = await caller.notif.getMessagePreviewsFromUserIdAndChatType(input4)
    expect(create).toBeDefined()
  })


  it('/getMiscNotifsWithSenderUsernameFromUserId', async () => {
    const create = await caller.notif.getMiscNotifsWithSenderUsernameFromUserId({ id: 1 })
    expect(create).toBeDefined()

    const create2 = await caller.notif.getMiscNotifsWithSenderUsernameFromUserId({ id: 10021 })
    expect(create2).toBeDefined()
  })


})
