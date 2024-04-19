import { z } from 'zod'

import { WorkoutTemplateInfoSchema } from '../../../validators/src'
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
        await prisma.set.createMany({
          data: exercise.sets.map((set) => ({
            id: set.id,
            type: set.type,
            reps: set.reps,
            weight: set.weight,
            exerciseLogId: set.exerciseLogId,
            unilateral: set.unilateral,
          })),
        })
      })
      exercises.forEach(async (exercise) => {
        await prisma.exerciseLog.create({
          data: {
            exerciseId: exercise.id,
            userId: input.userId,
            workoutTemplateId,
          },
        })
      })

      //   await prisma.exerciseLog.createMany({
      //     data: exercises.map((exercise) => ({
      //       sets: {
      //         create: exercise.sets,
      //       },
      //       exerciseId: exercise.id,
      //       userId: input.userId,
      //       workoutTemplateId,
      //     })),
      //   })

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
})

// export const workoutRouter = createTRPCRouter({
//     createNewWorkoutLog: publicProcedure.input(z.object()).mutation(async ({ ctx, input }) => {
//         const { prisma } = ctx
//         return prisma.workoutLog.create({
//             data: {
//                 name: input.name,
//                 description: input.description,
//                 duration: input.duration,
//                 finishedAt: input.finishedAt,
//                 exercises: {
//                     connect:
//                         input.exercises?.map((exercise)=>({
//                             id: exercise.id,
//                         })),
//                 },
//                 userId: input.userId,
//             },
//         })
//     }
// }),

//     createNewWorkout: publicProcedure
//     .input(
//       z.object({
//         name: z.string(),
//         description: z.string().optional(),
//         duration: z.number().int(),
//         finishedAt: z.date(),
//         exercises: z.array(
//           z.object({
//             id: z.number().int(),
//           }),
//         ),

//         // Past workouts should not be needed since there is no history of it being used if it was newly created
//         userId: z.number().int(),
//       }),
//     )
//     .mutation(async ({ ctx, input }) => {
//       const { prisma } = ctx

//       return prisma.workout.create({
//         data: {
//           name: input.name,
//           description: input.description,
//           duration: input.duration,
//           finishedAt: input.finishedAt,
//           exercises: {
//             connect:
//               input.exercises?.map((exercise)=>({
//                 id: exercise.id,
//               })),
//           },
//           userId: input.userId,
//         },
//       })
//     }),
// })
