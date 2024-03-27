import { exerciseRouter } from './router/exercise'
import { postRouter } from './router/post'
import { userRouter } from './router/user'
import { notifRouter } from './router/notif'
import { spotifyRouter } from './router/spotify'
import { workoutRouter } from './router/workout'
import { createTRPCRouter } from './trpc'
import { friendRouter } from './router/friend'

/**
 * step2: aliaes and CREATE IT TO THE FRONTEND routers
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  user: userRouter,
  notif: notifRouter,
  spotify: spotifyRouter,
  workout: workoutRouter,
  exercise: exerciseRouter,
  friend: friendRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
