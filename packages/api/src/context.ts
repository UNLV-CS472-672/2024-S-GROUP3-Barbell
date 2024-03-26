import { prisma } from '@acme/db'

import type { AppRouter } from './root'
import { appRouter, appRouter as trpc } from './root'
import { createCallerFactory } from './trpc'

const createCaller = createCallerFactory(appRouter)

export const caller = createCaller({
  prisma: prisma,
})
