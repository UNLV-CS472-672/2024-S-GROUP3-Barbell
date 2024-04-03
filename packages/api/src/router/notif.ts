import { ChatType } from '@prisma/client'
import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const notifRouter = createTRPCRouter({
  /**
   *  @remarks
   *  This returns all of the messages in order from oldest to newest within any chat type
   *
   *  @param  id - the id of the chat
   *  @param  type - the chat type (DIRECT or GROUP)
   *  @returns an array of message objects
   */
  getMessagesFromChatIdAndChatType: publicProcedure
    .input(z.object({ id: z.number().int(), type: z.nativeEnum(ChatType) }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx

      const chat = await prisma.chat.findFirst({
        where: {
          type: input.type,
          id: input.id,
        },
        select: {
          id: true,
          users: true,
        },
      })

      if (chat == undefined) {
        return []
      }

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
    .input(z.object({ chatId: z.number().int(), userId: z.number().int(), type: z.nativeEnum(ChatType) }))
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
          chatIds.push(chat.id)
        }
      })

      if (chatIds.length == 0) {
        return []
      }

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

  /**
   *  @remarks
   *  This accepts or denies a friend request for the user.
   *
   *  @param  receiverId - the id of the one who receives, logged in user
   *  @param  senderId - the id of the one who sends, *not* logged in user
   *  @param  acceptFR - boolean to accept friend request or not
   *  @returns the accept or deny mutation, adds as friend or does not add
   */
  acceptOrDenyFriendRequestReceiverIdSenderId: publicProcedure
    .input(z.object({ receiverId: z.number().int(), senderId: z.number().int(), acceptFR: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx

      if (input.acceptFR) {
        const newFriend = await prisma.user.findFirst({
          where: {
            id: input.senderId,
          },
        })

        return prisma.user.update({
          where: {
            id: input.senderId,
          },
          data: {
            friends: {
              push: newFriend,
            },
          },
        })
      }
    }),
})
