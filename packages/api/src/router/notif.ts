import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../trpc'
import { ChatType } from '@prisma/client'

export const notifRouter = createTRPCRouter({
  /**
   *  @remarks
   *  This returns all of the messages in order from oldest to newest within any chat type
   * 
   *  @param  id - the id of the direct message chat
   *  @param  type - the chat type (DIRECT or GROUP)
   *  @returns an array of message objects
   */
  getMessagesFromChatIdAndType: publicProcedure
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
   *  This returns the most recent message from each chat for a user, separated by type
   * 
   *  @param  id - the id of the user
   *  @param  type - type of the chat (DIRECT or GROUP)
   *  @returns an array of objects containing the chatId, and an array containing the most recent message for that chat
   */
    getMessagePreviewsFromUserId: publicProcedure
    .input(z.object({ id: z.number().int(), type: z.nativeEnum(ChatType) }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx

      const userChats = await prisma.user.findFirst({
        where: {
          id: input.id,
        },
        select: {
          chats: true,
        }
      })

      const chatIds: number[] = []
      userChats?.chats.forEach((chat) => {
        if(chat.type === input.type){
          chatIds.push(chat.id)
        }
      })

      if(chatIds.length == 0){
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
        }
      });

      return finalMessageForEachChat;
    }),


  /**
   *  @remarks
   *  This returns the miscellaneous notifications for a user.
   * 
   *  @param  id - the id of the user
   *  @returns an array of notification objects
   */
    getMiscNotifsFromUserId: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx

      return await prisma.notification.findMany({
        where: {
          receiverId: input.id,
        },
      })
    }),
    
  }
  )
