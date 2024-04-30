import { describe, expect, it } from 'vitest'

import { prisma } from '@acme/db'

import { createCaller, RouterInputs } from '../..'
import { createContextInner } from '../trpc'

describe('FRIEND', async () => {
  const ctx = await createContextInner()
  const caller = createCaller(ctx)

  const input: RouterInputs['friend']['byId'] = {
    id: 1,
  }

  it('/all', async () => {
    const all = await caller.friend.all()
    expect(all).toBeDefined()
  })

  it('/byId', async () => {
    const friend = await caller.friend.byId(input)
    expect(friend).toBeDefined()
  })

  it('/getFriends', async () => {
    const friend = await caller.friend.getFriends({ userId: 1 })
    expect(friend).toBeDefined()
  })

  // TODO: uncomment this
  // it('/makeFriendsReceiverIdSenderId', async () => {
  //   const deletedNotif = await caller.friend.makeFriendsReceiverIdSenderId({
  //     receiverId: 1,
  //     senderId: 1,
  //     accepted: false,
  //     notificationId: 2,
  //   })

  //   // recreate it
  //   const mockNotif = await prisma.notification.create({
  //     data: {
  //       receiverId: 1,
  //       content: 'content',
  //       senderId: 2,
  //       type: 'FRIEND_REQUEST',
  //     },
  //   })

  //   await caller.friend.makeFriendsReceiverIdSenderId({
  //     receiverId: 1,
  //     senderId: 2,
  //     accepted: true,
  //     notificationId: 1,
  //   })
  // })

  it('/deleteFriend', async () => {
    const friendCreate = await prisma.friend.create({
      data: {
        userId: 1,
        friendId: 2,
      },
    })

    const friendCreate2 = await prisma.friend.create({
      data: {
        userId: 2,
        friendId: 1,
      },
    })

    await caller.friend.deleteFriend({ id1: 1, id2: 2 })
  })

  it('/getFriendsWithChatIdFromUserId', async () => {
    const friend = await caller.friend.getFriendsWithChatIdFromUserId({ id: 1 })
    expect(friend).toBeDefined()

    const friend2 = await caller.friend.getFriendsWithChatIdFromUserId({ id: 1000 })
    // expect to fail
    expect(friend2).toBeDefined()
  })

  it('/getFriendsFromUserId', async () => {
    const friend = await caller.friend.getFriendsFromUserId({ id: 1 })
  })
})
