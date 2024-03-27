import { expect, test } from '@jest/globals'

import { prisma } from '@acme/db'

/*  */
test('USER /all', async () => {
  // Example assertions about the response
  const user = await prisma.user.findFirst()
  expect(user).toBeDefined()
})

/*  */
test('USER /byId', async () => {
  // Example assertions about the response
  const user = await prisma.user.findFirst({ where: { id: 1 } })
  expect(user).toBeDefined()
})
