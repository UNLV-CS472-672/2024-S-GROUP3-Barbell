import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../trpc'

export const notifRouter = createTRPCRouter({
  /**
   *  @remarks
   *  This returns all of the messages in order from oldest to newest within a direct message chat
   *  between two users.
   * 
   *  @param  id - the id of the direct message chat
   *  @returns an array of message objects
   */
  getDMsFromChatId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx

      const chat = await prisma.chat.findFirst({
        where: {
          type: 'DIRECT',
          id: input.id,
        },
        select: {
          id: true,
          users: true,
        },
      })

      if (!chat) {
        throw new Error('No messages found for chat ' + input.id);
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

    
  }
  )