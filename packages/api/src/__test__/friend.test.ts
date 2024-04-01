import { expect, test } from '@jest/globals'

import { prisma } from '@acme/db'

/*  */
test('FRIEND /all', async () => {
  const friends = await prisma.friend.findMany()

  expect(friends).toBeDefined()
  expect(friends.length).toBeGreaterThan(0)
})

/*  */
test('FRIEND /byId', async () => {
  const friend = await prisma.friend.findFirst({
    where: {
      id: 1,
    },
  })

  expect(friend).toBeDefined()
  expect(friend?.id).toBe(1)
})

/*  */
test('FRIEND /create', async () => {
  const friend = await prisma.friend.upsert({
    where: {
      id: 1,
    },
    update: {
      userId: 1,
    },
    create: {
      userId: 1,
    },
  })

  expect(friend).toBeDefined()
  expect(friend.id).toBeDefined()
})

/*  */
test('FRIEND /delete', async () => {
  const friend = await prisma.friend.delete({
    where: {
      id: 1,
    },
  })

  expect(friend).toBeDefined()
  expect(friend.id).toBe(1)
})
