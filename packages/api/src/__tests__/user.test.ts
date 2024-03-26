import type { inferProcedureInput } from '@trpc/server'

import { expect, test } from '@jest/globals'

import { prisma } from '@acme/db'

import type { AppRouter } from '../root'
import { caller } from '../context'
import { appRouter, appRouter as trpc } from '../root'
import { createCallerFactory } from '../trpc'

test('GET /users', async () => {
  // 1. create a caller-function for your router
  //   const headers = new Headers()
  //   headers.append('x-trpc-source', 'test')

  console.log('wer are ere')

  const response = await caller.user.all()

  // console.log(response)
  expect(true).toBe(true)
})
