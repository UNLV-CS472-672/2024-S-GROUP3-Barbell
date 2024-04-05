import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'
import { UpdateUserSchema } from '../../../validators/src';


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
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findFirst({ where: { id: input.id } })
    }),

  /**
   * create a user
   */

  /**
   * delete a user
   */

  /**
   * update a user
   */
  update: publicProcedure
    .input(UpdateUserSchema)
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      return prisma.user.update({
        where: { id: input.id, },
        data: {
          notificationsBanners: input.notificationsBanners
        }
      })
    })
})
