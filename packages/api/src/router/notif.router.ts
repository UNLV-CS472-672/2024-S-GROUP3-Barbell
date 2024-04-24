import { ChatType, User } from '@prisma/client'
import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const notifRouter = createTRPCRouter({
  /**
   *  @remarks
   *  This returns all of the messages in order from oldest to newest within any chat type
   *  IF not exist, create one
   *
   *  @param  id - the id of the chat
   *  @param  type - the chat type (DIRECT or GROUP)
   *  @returns an array of message objects
   */
  getMessagesFromChatIdAndChatType: publicProcedure
    .input(
      z.object({
        id: z.number().int(),
        type: z.nativeEnum(ChatType),
        user1Id: z.number().int(),
        user2Id: z.number().int(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx

      const users = await prisma.user.findMany({
        where: {
          id: {
            in: [input.user1Id, input.user2Id],
          },
        },
      })

      const chat = await prisma.chat.upsert({
        where: {
          type: input.type,
          id: input.id,
        },
        select: {
          id: true,
          users: true,
        },
        create: {
          type: input.type,
          createdByUserId: input.user1Id,
          users: {
            connect: users.map((user: User) => ({ id: user.id })),
          },
        },
        update: {},
      })

      return prisma.message.findMany({
        where: {
          chatId: chat.id,
        },
        orderBy: {
          createdAt: 'asc',
        },
      })
    }),

  /**
   *  @remarks
   *  Adds current user to readByUserIds field in DB
   *
   *  @param  chatId - the id of the chat
   *  @param  userId - the id of the logged in user
   *  @param  type - the chat type (DIRECT or GROUP)
   *  @returns an array of message objects
   */
  markChatAsReadByChatIdAndUserIdAndChatType: publicProcedure
    .input(
      z.object({
        chatId: z.number().int(),
        userId: z.number().int(),
        type: z.nativeEnum(ChatType),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx

      return prisma.chat.update({
        where: {
          id: input.chatId,
          type: input.type,
        },
        data: {
          readByUserIds: {
            push: input.userId,
          },
        },
      })
    }),

  /**
   *  @remarks
   *  This returns the most recent message from each chat for a user, separated by type
   *
   *  @param  id - the id of the user
   *  @param  type - type of the chat (DIRECT or GROUP)
   *  @returns an array of objects containing the chatId, and an array containing the most recent message for that chat
   */
  getMessagePreviewsFromUserIdAndChatType: publicProcedure
    .input(z.object({ id: z.number().int(), type: z.nativeEnum(ChatType) }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx

      const userChats = await prisma.user.findFirst({
        where: {
          id: input.id,
        },
        select: {
          chats: true,
        },
      })

      const chatIds: number[] = []
      userChats?.chats.forEach((chat) => {
        if (chat.type === input.type) {
          /* istanbul ignore next -- @preserve */
          chatIds.push(chat.id)
        }
      })

      if (chatIds.length == 0) {
        return []
      }

      /* istanbul ignore next -- @preserve */
      const finalMessageForEachChat = await prisma.chat.findMany({
        where: {
          id: {
            in: chatIds,
          },
        },
        select: {
          users: true,
          id: true,
          readByUserIds: true,
          name: true,
          createdByUserId: true,
          createdAt: true,
          createdBy: {
            select: {
              username: true,
            },
          },
          messages: {
            orderBy: {
              createdAt: 'desc',
            },
            take: 1,
            select: {
              content: true,
              createdAt: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      /* istanbul ignore next -- @preserve */
      return finalMessageForEachChat
    }),

  /**
   *  @remarks
   *  This returns the miscellaneous notifications for a user.
   *
   *  @param  id - the id of the user
   *  @returns an array of notification objects with a senderUsername attached
   */
  getMiscNotifsWithSenderUsernameFromUserId: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx

      // fetch notifications for the given receiverId
      const notifs = await prisma.notification.findMany({
        where: {
          receiverId: input.id,
        },
        select: {
          id: true,
          type: true,
          senderId: true,
          receiverId: true,
          createdAt: true,
          content: true,
          sender: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      if (notifs == null) {
        return []
      }

      return notifs
    }),
})
