import { postRouter } from './router/post'
import { userRouter } from './router/user'
import { notifRouter } from './router/notif'
import { workoutRouter } from './router/workout'
import { createTRPCRouter } from './trpc'
import { exerciseRouter } from './router/exercise'

/**
 * step2: aliaes and CREATE IT TO THE FRONTEND routers
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  user: userRouter,
  notif: notifRouter,
  workout: workoutRouter,
  exercise: exerciseRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
