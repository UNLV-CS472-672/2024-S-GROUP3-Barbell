import { postRouter } from './router/post'
import { userRouter } from './router/user'
import { createTRPCRouter } from './trpc'

/**
 * step2: aliaes and CREATE IT TO THE FRONTEND routers
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  user: userRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
