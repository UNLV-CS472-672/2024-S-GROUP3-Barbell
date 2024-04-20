import { exerciseRouter } from './router/exercise.router'
import { friendRouter } from './router/friend.router'
import { notifRouter } from './router/notif.router'
import { postRouter } from './router/post.router'
import { spotifyRouter } from './router/spotify.router'
import { userRouter } from './router/user.router'
import { workoutRouter } from './router/workout.router'
import { workoutLogRouter } from './router/workoutlog.router'
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
  workoutLog: workoutLogRouter,
  healthcheck: publicProcedure.query(() => 'barbell cooking!'),
})

// export type definition of API
export type AppRouter = typeof appRouter
