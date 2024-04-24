import { ChatType, NotificationType } from '@prisma/client'
import { z } from 'zod'

import { UpdateUserSchema } from '../../../validators/src'
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
   * get user by id
   */
  byId: publicProcedure.input(z.object({ id: z.number() })).query(({ ctx, input }) => {
    return ctx.prisma.user.findFirst({ where: { id: input.id } })
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

      return await prisma.user.upsert({
        where: { clerkId: input.clerkId },
        update: {
          username: input.username,
          name: input.name,
        },
        create: {
          clerkId: input.clerkId,
          username: input.username,
          name: input.name,
        },
      })
    }),

  /**
   * get user by clerkId
   */
  getIdByClerkId: publicProcedure
    .input(z.object({ clerkId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findFirst({ where: { clerkId: input.clerkId } }).then((user) => {
        return user?.id
      })
    }),

  /**
   * update user
   */
  update: publicProcedure.input(UpdateUserSchema).mutation(async ({ ctx, input }) => {
    const { prisma } = ctx
    return prisma.user.update({
      where: { id: input.id },
      data: {
        notificationsBanners: input.notificationsBanners,
      },
    })
  }),

  /**
   * delete user byId
   */
  delete: publicProcedure.input(z.object({ id: z.number() })).mutation(({ ctx, input }) => {
    return ctx.prisma.user.delete({ where: { id: input.id } })
  }),

  /**
   * get user by id + extra info for profile page
   */
  getProfileInfoById: publicProcedure
    .input(z.object({ viewingProfileId: z.number().int(), loggedInUserId: z.number().int() }))
    .query(async ({ ctx, input }) => {
      interface ProfileInfo {
        username: string | undefined
        streak: number | undefined
        name: string | undefined | null
        posts: any
        postCount: number | undefined
        workoutCount: number
        friendStatus: boolean | 'REQUESTED' | 'PENDING'
        chatId: number | undefined
        friendNotifSenderId: number | undefined | null
        friendNotifReceiverId: number | undefined
        friendNotifId: number | undefined
      }

      const userInfo = await ctx.prisma.user.findFirst({
        where: {
          id: input.viewingProfileId,
        },
        select: {
          username: true,
          streak: true,
          name: true,
          posts: true,
        },
      })

      const workoutInfo = await ctx.prisma.user.findFirst({
        where: { id: input.viewingProfileId },
        select: { workoutHistory: true },
      })

      const friend = await ctx.prisma.friend.findFirst({
        where: {
          userId: input.loggedInUserId,
          friendId: input.viewingProfileId,
        },
        select: {
          id: true,
        },
      })

      const friendNotif = await ctx.prisma.notification.findFirst({
        where: {
          senderId: {
            in: [input.loggedInUserId, input.viewingProfileId],
          },
          AND: {
            receiverId: {
              in: [input.loggedInUserId, input.viewingProfileId],
            },
          },
          type: NotificationType.FRIEND_REQUEST,
        },
        select: {
          senderId: true,
          receiverId: true,
          id: true,
        },
      })

      let friendStatus: boolean | 'REQUESTED' | 'PENDING' = false
      if (friend) {
        friendStatus = true
      } else if (!friend && friendNotif?.senderId == input.loggedInUserId) {
        friendStatus = 'REQUESTED'
      } else if (!friend && friendNotif?.senderId == input.viewingProfileId) {
        friendStatus = 'PENDING'
      }

      const workoutCount = Number(workoutInfo?.workoutHistory.length)

      const chat = await ctx.prisma.chat.findFirst({
        where: {
          type: ChatType.DIRECT,
          AND: [
            { users: { some: { id: input.viewingProfileId } } },
            { users: { some: { id: input.loggedInUserId } } },
          ],
        },
        select: {
          id: true,
        },
      })

      const profileInfo: ProfileInfo = {
        username: userInfo?.username,
        streak: userInfo?.streak,
        name: userInfo?.name,
        postCount: userInfo?.posts.length,
        posts: userInfo?.posts,
        workoutCount: workoutCount,
        friendStatus: friendStatus,
        chatId: chat?.id,
        friendNotifSenderId: friendNotif?.senderId,
        friendNotifReceiverId: friendNotif?.receiverId,
        friendNotifId: friendNotif?.id,
      }
      return profileInfo
    }),

  getUserWorkoutHistory: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findFirst({
        where: { id: input.userId },
        select: { workoutHistory: true },
      })
    }),

  getUserWorkoutHistoryPaginated: publicProcedure
    .input(
      z.object({
        id: z.number().int(),
        workouts: z.number().int().optional(),
        page: z.number().int().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const pageSize = input.workouts
      const pageNumber = input.page || 1
      const skip = (pageNumber - 1) * Number(pageSize)

      return ctx.prisma.workoutLog.findMany({
        where: {
          userId: input.id,
        },
        orderBy: {
          finishedAt: 'desc',
        },
        select: {
          finishedAt: true,
          id: true,
          user: true,
          userId: true,
          workoutTemplate: true,
        },
        skip,
        take: pageSize,
      })
    }),
})
