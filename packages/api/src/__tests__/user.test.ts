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

import { expect, test } from '@jest/globals';
import { prisma } from '@acme/db';
import { appRouter } from '../root';
import { createCallerFactory } from '../trpc';

test('GET /users', async () => {
  const createCaller = createCallerFactory(appRouter);
  const caller = createCaller({ prisma });

  // Assuming 'user.all' is a valid endpoint that returns an array of users
  const response = await caller.user.all();
  
  // Example assertions about the response
  expect(response).toBeDefined();       // Check if the response is defined
  expect(Array.isArray(response)).toBe(true); // Check if the response is an array
  // Further assertions based on your actual API response structure
});
