import { z } from 'zod'

import { UpdateUserSchema } from '../../../validators/src'
import { createTRPCRouter, publicProcedure } from '../trpc'

/**
 * step1: define user router
 * @bigboidanwithacan
 */
export const userRouter = createTRPCRouter({
  /**
   * <get all users>
   */
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({ orderBy: { id: 'desc' } })
  }),

  /**
   * get user by id
   */
  byId: publicProcedure.input(z.object({ id: z.number() })).query(({ ctx, input }) => {
    return ctx.prisma.user.findFirst({ where: { id: input.id } })
  }),

  /**
   * create a user
   */
  create: publicProcedure
    .input(z.object({ clerkId: z.string(), username: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx

      const user = await prisma.user.findFirst({ where: { clerkId: input.clerkId } })

      if (user) {
        return user
      }

      // return await prisma.user.create({
      //   data: {
      //     clerkId: input.clerkId,
      //     username: input.username,
      //     name: input.name,
      //   },
      // })
      return await prisma.user.upsert({
        where: { clerkId: input.clerkId },
        update: {
          username: input.username,
          name: input.name,
        },
        create: {
          clerkId: input.clerkId,
          username: input.username,
          name: input.name,
        },
      })
    }),

  /**
   * get user by clerkId
   */
  getIdByClerkId: publicProcedure
    .input(z.object({ clerkId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findFirst({ where: { clerkId: input.clerkId } }).then((user) => {
        return user?.id
      })
    }),

  /**
   * update user
   */
  update: publicProcedure.input(UpdateUserSchema).mutation(async ({ ctx, input }) => {
    const { prisma } = ctx
    return prisma.user.update({
      where: { id: input.id },
      data: {
        notificationsBanners: input.notificationsBanners,
      },
    })
  }),

  /**
   * delete user byId
   */
  delete: publicProcedure.input(z.object({ id: z.number() })).mutation(({ ctx, input }) => {
    return ctx.prisma.user.delete({ where: { id: input.id } })
  }),

  /**
   * get user by id + extra info for profile page
   */
  getProfileInfoById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      interface ProfileInfo {
        username: string | undefined
        streak: number | undefined
        name: string | undefined | null
        workoutCount: number
      }

      const userInfo = await ctx.prisma.user.findFirst({
        where: {
          id: input.id,
        },
        select: {
          username: true,
          streak: true,
          name: true,
        },
      })

      const workoutInfo = await ctx.prisma.workoutLog.findMany({
        where: {
          userId: input.id,
        },
        select: {
          workoutId: true,
        },
      })

      const workoutCount = workoutInfo.length

      const profileInfo: ProfileInfo = {
        username: userInfo?.username,
        streak: userInfo?.streak,
        name: userInfo?.name,
        workoutCount: workoutCount,
      }
      return profileInfo
    }),
})
