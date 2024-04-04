import { z } from 'zod'

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
  byClerkId: publicProcedure.input(z.object({ clerkId: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.user.findFirst({ where: { clerkId: input.clerkId } })
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

      return await prisma.user.create({
        data: {
          clerkId: input.clerkId,
          username: input.username,
          name: input.name,
        },
      })
    }),

  getIdByClerkId: publicProcedure.input(z.object({ clerkId: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.user.findFirst({ where: { clerkId: input.clerkId } }).then((user) => {
      return user?.id
    })
  }),
})
