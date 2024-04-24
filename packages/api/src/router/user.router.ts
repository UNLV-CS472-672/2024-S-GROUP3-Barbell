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
   * get user by clerkId
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

  getUserWorkoutHistory: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findFirst({
        where: { id: input.userId },
        select: { workoutHistory: true },
      })
    }),
})
