import { exerciseRouter } from './router/exercise'
import { friendRouter } from './router/friend'
import { notifRouter } from './router/notif'
import { postRouter } from './router/post'
import { spotifyRouter } from './router/spotify'
import { userRouter } from './router/user'
import { workoutRouter } from './router/workout'
import { createTRPCRouter, publicProcedure } from './trpc'

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
  healthcheck: publicProcedure.query(() => 'barbell cooking!'),
})

// export type definition of API
export type AppRouter = typeof appRouter
