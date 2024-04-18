import { ChatType, User } from '@prisma/client'
import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

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
  getFriendsWithChatIdFromUserId: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      interface UserWithChatId extends User {
        chatId: number | null
      }

      try {
        const friendsList = await ctx.prisma.friend.findMany({
          where: {
            userId: input.id,
          },
          select: {
            friendId: true,
          },
        })

        // convert to number array
        const friendIds: number[] = friendsList.map((friend) => friend.friendId)

        // get friends as users
        const usersList = await ctx.prisma.user.findMany({
          where: {
            id: { in: friendIds },
          },
        })

        // find corresponding chat for user if it exists
        const usersWithChatId = await Promise.all(
          usersList.map(async (user) => {
            const chatIdWithUsers = await ctx.prisma.chat.findFirst({
              where: {
                type: ChatType.DIRECT,
                AND: [{ users: { some: { id: input.id } } }, { users: { some: { id: user.id } } }],
              },
              select: {
                id: true,
              },
            })

            const userWithChatId: UserWithChatId = {
              ...user,
              chatId: chatIdWithUsers ? chatIdWithUsers.id : null,
            }

            return userWithChatId
          }),
        )

        return usersWithChatId
      } catch (error) {
        console.error('Error fetching friends with chatId:', error)
        throw new Error('Failed to fetch friends with chatId')
      }
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
  createChatWithFriend: publicProcedure
    .input(z.object({ userId: z.number().int(), friendId: z.number().int() }))
    .mutation(({ ctx, input }) => {
      const { prisma } = ctx
      // Create a new chat if one doesn't exist
      return prisma.chat.create({
        data: {
          type: ChatType.DIRECT,
          users: {
            connect: [{ id: input.userId }, { id: input.friendId }],
          },
          createdByUserId: input.userId,
        },
        select: {
          id: true,
        },
      })
    }),
})
