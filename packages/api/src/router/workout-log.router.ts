import { z } from 'zod'

import { WorkoutTemplateInfoSchema } from '@acme/validators'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const workoutLogRouter = createTRPCRouter({
  createNewWorkoutLog: publicProcedure
    .input(
      z.object({
        duration: z.number().int(),
        userId: z.number().int(),
        workoutTemplateId: z.number().int(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const { prisma } = ctx

      return prisma.workoutLog.create({
        data: {
          duration: input.duration,
          workoutTemplate: {
            connect: {
              id: input.workoutTemplateId,
            },
          },
          user: {
            connect: {
              id: input.userId,
            },
          },
        },
      })
    }),
  createNewWorkoutLogAndUpdateValues: publicProcedure
    .input(
      z.object({
        duration: z.number().int(),
        userId: z.number().int(),
        workoutData: WorkoutTemplateInfoSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx

      const { workoutTemplateId, exercises } = input.workoutData

      exercises.forEach(async (exercise) => {
        await prisma.exerciseLog.create({
          data: {
            exerciseId: exercise.id,
            userId: input.userId,
            workoutTemplateId,
            sets: {
              createMany: {
                data: exercise.sets.map((set) => ({
                  type: set.type,
                  reps: set.reps,
                  weight: set.weight,
                  unilateral: set.unilateral,
                })),
              },
            },
          },
        })
      })

      return prisma.workoutLog.create({
        data: {
          duration: input.duration,
          workoutTemplate: {
            connect: {
              id: workoutTemplateId,
            },
          },
          user: {
            connect: {
              id: input.userId,
            },
          },
        },
      })
    }),

  /**
   *
   */
  getActivityFeedWorkouts: publicProcedure
    .input(
      z.object({
        friendIds: z.array(z.number().int()),
        count: z.number().int(),
      }),
    )
    .query(({ ctx, input }) => {
      const { prisma } = ctx
      return prisma.workoutLog.findMany({
        where: {
          userId: {
            in: input.friendIds,
          },
        },
        take: input.count,
        orderBy: {
          finishedAt: 'desc',
        },
        include: {
          user: true,
          workoutTemplate: true
        },
      })
    }),
})
