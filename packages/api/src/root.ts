import { exerciseRouter } from './router/exercise.router'
import { friendRouter } from './router/friend.router'
import { notifRouter } from './router/notif.router'
import { postRouter } from './router/post.router'
import { post2Router } from './router/post2.router'
import { spotifyRouter } from './router/spotify.router'
import { userRouter } from './router/user.router'
import { workoutLogRouter } from './router/workout-log.router'
import { workoutTemplateRouter } from './router/workout-template.router'
import { createTRPCRouter, publicProcedure } from './trpc'

/**
 * step2: aliaes and CREATE IT TO THE FRONTEND routers
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  post2: post2Router,
  user: userRouter,
  notif: notifRouter,
  spotify: spotifyRouter,
  workoutTemplate: workoutTemplateRouter,
  workoutLog: workoutLogRouter,
  exercise: exerciseRouter,
  friend: friendRouter,
  healthcheck: publicProcedure.query(() => 'barbell cooking!'),
})

// export type definition of API
export type AppRouter = typeof appRouter
