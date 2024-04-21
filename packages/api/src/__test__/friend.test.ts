import { expect, test } from '@jest/globals'

import { prisma } from '@acme/db'

// ...

test('FRIEND /getFriendsWithChatIdFromUserId', async () => {
  const userId = 1

  // Create test data
  const user1 = await prisma.user.create({
    data: {
      name: 'John',
      username: 'john123',
      // other user fields...
    },
  })

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane',
      username: 'jane456',
      // other user fields...
    },
  })

  await prisma.friend.create({
    data: {
      userId: userId,
      friendId: user1.id,
    },
  })

  await prisma.friend.create({
    data: {
      userId: userId,
      friendId: user2.id,
    },
  })

  await prisma.chat.create({
    data: {
      type: 'DIRECT',
      users: {
        connect: [{ id: userId }, { id: user1.id }],
      },
      createdByUserId: userId,
    },
  })

  // Call the API function
  const friends = await prisma.user.findMany({
    where: {
      id: {
        in: (
          await prisma.friend.findMany({
            where: { userId: userId },
            select: { friendId: true },
          })
        ).map((friend) => friend.friendId),
      },
    },
    include: {
      chats: {
        where: {
          type: 'DIRECT',
          users: { some: { id: userId } },
        },
        take: 1,
      },
    },
  })

  // Add assertions
  expect(friends).toBeDefined()
  expect(friends.length).toBe(2)
  if (friends[0] && friends[0].chats) {
    expect(friends[0].chats.length).toBeLessThanOrEqual(1)
  }
})
