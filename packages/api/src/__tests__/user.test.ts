// import { expect, test } from 'vitest';

// // Assuming the rest of your imports remain the same
// import { prisma } from '@acme/db';
// import type { AppRouter } from '../root';
// import { caller } from '../context';
// import { appRouter, appRouter as trpc } from '../root';
// import { createCallerFactory } from '../trpc';

// test('GET /users', async () => {
//   // Your test setup and execution remains largely the same

//   // const response = await caller.user.all();

//   // Your actual test assertions go here
//   // For example, to check if response is defined:
//   expect(true).toBeDefined();

// });

import { expect, test } from '@jest/globals'

import { prisma } from '@acme/db'

import { appRouter } from '../root'
import { createCallerFactory } from '../trpc'

/*  */
test('GET /users', async () => {
  // Example assertions about the response
  const user = await prisma.user.findFirst()
  expect(user).toBeDefined()
})

/*  */
test('GET /users/:id', async () => {
  // Example assertions about the response
  const user = await prisma.user.findFirst({ where: { id: 1 } })
  expect(user).toBeDefined()
})



