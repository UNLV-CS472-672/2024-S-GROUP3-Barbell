import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

import { ChatType } from '@prisma/client'

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
  * get a user's friends
  */
  getFriends: publicProcedure
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

      return ctx.prisma.user.findMany({
        where: {
          id: { in: friendIds },
        },
      })
    }),

  /**
  * @remarks 
  * This will route to the message between the user and the friend
  * 
  * @param userId - the id of the user
  * @param friendId - the id of the friend
  * @return either the chatId if a chat exists between the two users,
  *         or creates a new chat and returns the chatId of the new chat
  */
  getChatIdByFriendId: publicProcedure
  .input(z.object({ userId: z.number().int(), friendId: z.number().int() }))
  .mutation(async ({ ctx, input }) => {
    const { prisma } = ctx;

    let chat = await prisma.chat.findFirst({
      where: {
        type: ChatType.DIRECT,
        users: {
          every: {
            id: {
              in: [input.userId, input.friendId],
            },
          },
        },
      },
      select: {
        id: true,
      },
    });

    if (!chat) {
      // Create a new chat if one doesn't exist
      chat = await prisma.chat.create({
        data: {
          type: ChatType.DIRECT,
          users: {
            connect: [
              { id: input.userId },
              { id: input.friendId },
            ],
          },
          createdByUserId: input.userId,
        },
        select: {
          id: true,
        },
      });
    }

    return chat.id;
  }),
})