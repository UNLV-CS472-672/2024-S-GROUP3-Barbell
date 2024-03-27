import { prisma } from '@acme/db'

import { appRouter } from './root'
import { createCallerFactory } from './trpc'

const createCaller = createCallerFactory(appRouter)

export const caller = createCaller({
  prisma: prisma,
})
