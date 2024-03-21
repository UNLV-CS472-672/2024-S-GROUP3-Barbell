import { postRouter } from './router/post'
import { notifRouter } from './router/notif'
import { createTRPCRouter } from './trpc'

export const appRouter = createTRPCRouter({
  post: postRouter,
  notif: notifRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
