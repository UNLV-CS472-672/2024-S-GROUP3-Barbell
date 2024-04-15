import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'
import { userRouter } from './user'

export const friendRouter = createTRPCRouter({
  /**
   * Get all friends
   */
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.friend.findMany({
      orderBy: { id: 'asc' },
      include: { user: true },
    })
  }),

  /**
   * Get friend by id
   */
  byId: publicProcedure.input(z.object({ id: z.number() })).query(({ ctx, input }) => {
    return ctx.prisma.friend.findFirst({
      where: { id: input.id },
      include: { user: true },
    })
  }),

  /**
   *  @remarks
   *  This accepts or denies a friend request for the user.
   *
   *  @param  receiverId - the id of the one who receives, logged in user
   *  @param  senderId - the id of the one who sends, *not* logged in user
   *  @returns the accept or deny mutation, adds as friend or does not add
   */
  makeFriendsReceiverIdSenderId: publicProcedure
    .input(
      z.object({
        receiverId: z.number().int(),
        senderId: z.number().int(),
        accepted: z.boolean(),
        notificationId: z.number().int(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.accepted) {
        await ctx.prisma.friend.create({
          data: {
            friendId: input.receiverId,
            userId: input.senderId,
          },
        })

        await ctx.prisma.friend.create({
          data: {
            friendId: input.senderId,
            userId: input.receiverId,
          },
        })
      }

      await ctx.prisma.notification.delete({
        where: {
          id: input.notificationId,
        },
      })
    }),

  /**
   * Delete a friend
   */
  delete: publicProcedure.input(z.object({ id: z.number() })).mutation(({ ctx, input }) => {
    return ctx.prisma.friend.delete({
      where: { id: input.id },
    })
  }),

  /**
   * Get friends for the current user
   */

  getFriendsForCurrentUser: publicProcedure.query(async ({ ctx }) => {
    // Retrieve clerkId of the current user from session or wherever it's stored
    const clerkId = ctx.session.user.clerkId

    // Retrieve user ID based on clerkId
    const currentUserId = await userRouter.getIdByClerkId({ clerkId })

    // Retrieve friends of the current user
    return ctx.prisma.friend.findMany({
      where: {
        userId: currentUserId,
      },
      orderBy: { id: 'asc' },
      include: { user: true },
    })
  }),

  /**
   * USAGE:
   * (inside component/page)
   * const { userData } = useGlobalContext()
   * const { data } = api.friend.getFriendsFromUserId({ id: userData.id })
   */
  getFriendsFromUserId: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const friendsList = await ctx.prisma.friend.findMany({
        where: {
          userId: input.id,
        },
      })

      const friendIds: number[] = friendsList.map((item) => {
        return item.friendId
      })

      return await ctx.prisma.user.findMany({
        where: {
          id: {
            in: friendIds,
          },
        },
      })
    }),
})
