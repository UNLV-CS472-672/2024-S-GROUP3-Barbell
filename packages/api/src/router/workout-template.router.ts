import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const workoutTemplateRouter = createTRPCRouter({
  getAllWorkoutTemplatesByUserId: publicProcedure
    .input(
      z.object({
        userId: z.number().int(),
      }),
    )
    .query(({ ctx, input }) => {
      const { prisma } = ctx

      return prisma.workoutTemplate.findMany({
        where: {
          userId: input.userId,
        },
      })
    }),

  getWorkoutTemplateInfoById: publicProcedure
    .input(
      z.object({
        id: z.number().int(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx

      const workoutTemplate = await prisma.workoutTemplate.findFirst({
        where: {
          id: input.id,
        },
      })

      if (!workoutTemplate) {
        return {
          error: 'Workout template not found',
        }
      }

      // getting all the exercises from the exerciseIds array and getting the most frequent exerciseLog for each exercise
      const exerciseList = await prisma.exercise.findMany({
        where: {
          id: {
            in: workoutTemplate.exerciseIds,
          },
        },
        include: {
          exerciseLogs: {
            orderBy: {
              createdAt: 'desc',
            },
            where: {
              workoutTemplateId: input.id,
            },
            take: 1,
            select: {
              sets: true,
              id: true,
            },
          },
        },
      })

      const response = {
        workoutTemplateId: workoutTemplate.id,
        workoutName: workoutTemplate.name,
        exercises: exerciseList.map((exercise) => {
          return {
            id: exercise.id,
            name: exercise.name,
            bodyPart: exercise.bodyPart,
            category: exercise.category,
            note: exercise.note,
            sets: exercise.exerciseLogs[0]
              ? exercise.exerciseLogs[0]?.sets.map((set) => {
                  return {
                    id: set.id,
                    type: set.type,
                    reps: set.reps,
                    weight: set.weight,
                    unilateral: set.unilateral,
                    exerciseId: exercise.id,
                    // exerciseLogId: exercise.exerciseLogs[0]!.id,
                  }
                })
              : [],
          }
        }),
      }

      // console.log(response)

      return response
    }),
})
