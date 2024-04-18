import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const postRouter = createTRPCRouter({
  /**
   *
   */
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({ orderBy: { id: 'desc' } })
  }),

  /**
   *
   */
  byId: publicProcedure.input(z.object({ id: z.number() })).query(({ ctx, input }) => {
    return ctx.prisma.post.findFirst({ where: { id: input.id } })
  }),
  /**
   *
   */
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
      // return ctx.prisma.post.create({ data: input })
      return ctx.prisma.post.upsert({
        where: { id: 1 },
        update: input,
        create: input,
      })
    }),
  /**
   *
   */
  delete: publicProcedure.input(z.object({ id: z.number() })).mutation(({ ctx, input }) => {
    return ctx.prisma.post.delete({ where: { id: input.id } })
  }),

  /**
   *  @remarks
   *  This returns the user-specified most recent posts from all friends for a user
   *
   *  @param  id - the id of the user
   *  @param  postCount - the number of posts to get
   *  @returns an array of the [#] most recent posts from the user's friends
   */
  getRecentPostsByUserIdAndPostCount: publicProcedure
    .input(z.object({ id: z.number().int(), postCount: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const friendsList = await ctx.prisma.friend.findMany({
        where: {
          userId: input.id,
        },
      })

      const friendIds: number[] = friendsList.map((item) => {
        return item.friendId
      })

      return ctx.prisma.post.findMany({
        where: {
          authorId: { in: friendIds },
        },
        select: {
          author: true,
          content: true,
          title: true,
          id: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: input.postCount,
      })
    }),

  /**
   *
   */
})
