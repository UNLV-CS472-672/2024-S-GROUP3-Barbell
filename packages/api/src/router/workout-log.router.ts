// import {  z } from 'zod'

// import { createTRPCRouter, publicProcedure } from '../trpc'

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