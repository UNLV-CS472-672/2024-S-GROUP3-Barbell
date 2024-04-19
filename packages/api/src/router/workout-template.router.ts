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
            sets: exercise.exerciseLogs[0]?.sets.map((set) => {
              return {
                id: set.id,
                type: set.type,
                reps: set.reps,
                weight: set.weight,
                unilateral: set.unilateral,
                exerciseId: exercise.id,
              }
            }),
          }
        }),
      }

      console.log(response)

      return response
    }),

  // getWorkoutTemplateInfoById: publicProcedure
  // .input(z.object({
  //   id: z.number().int()
  // }))
  // .query(({ ctx }) => {
  //   const { prisma } = ctx

  //   return prisma.workoutTemplate.findMany()
  // }),

  // /**
  //  * This function creates a new workout in the database.
  //  *
  //  * @params ctx - the context object for this function. It is related to the prisma client used for our database operations.
  //  * @params input - contains the input needed to created the workout, the individual inputs are
  //  *          - name: the name of the workout
  //  *          - description: the description of the workout
  //  *          - duration: the duration of the workout
  //  *          - finishedAt: the date and time the workout was finished
  //  *          - exercises: an array of exercise objects, they are the individual exercises that make up the workout
  //  *              - name: the name of the exercise
  //  *              - note: an optional note that describes the exercise
  //  *              - body_part: the body part that the exercise targets
  //  *              - category: the type of exercise it is
  //  *          - userId: the ID of the user that created the workout
  //  * @returns the newly created workout object
  //  */
  // createNewWorkout: publicProcedure
  //   .input(
  //     z.object({
  //       name: z.string(),
  //       description: z.string().optional(),
  //       duration: z.number().int(),
  //       finishedAt: z.date(),
  //       exercises: z.array(
  //         z.object({
  //           id: z.number().int(),
  //         }),
  //       ),

  //       // Past workouts should not be needed since there is no history of it being used if it was newly created
  //       userId: z.number().int(),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const { prisma } = ctx

  //     return prisma.workoutTemplate.create({
  //       data: {
  //         name: input.name,
  //         description: input.description,
  //         duration: input.duration,
  //         finishedAt: input.finishedAt,
  //         exercises: {
  //           connect:
  //             input.exercises?.map((exercise)=>({
  //               id: exercise.id,
  //             })),
  //         },
  //         userId: input.userId,
  //       },
  //     })
  //   }),

  // /**
  //  *  @remarks
  //  *  This function returns all of the workouts from our database.
  //  *  The workouts are ordered by their ID in descending order when they are returned.
  //  *
  //  * @params ctx - the context object for this function. It is related to the prisma client used for our database operations.
  //  * @returns an array of workoutTemplate objects
  //  */

  // getAllWorkouts: publicProcedure.query(({ ctx }) => {
  //   const { prisma } = ctx

  //   return prisma.workoutTemplate.findMany({
  //     orderBy: {
  //       id: 'desc',
  //     },
  //   })
  // }),

  // /**
  //  * This function returns a workoutTemplate by its ID
  //  *
  //  * @params id - the ID of the workoutTemplate that is to be retrieved
  //  * @params ctx - the context object for this function. It is related to the prisma client used for our database operations.
  //  */

  // getWorkoutFromWorkoutID: publicProcedure.input(z.object({ id: z.number().int() })).query(({ ctx, input }) => {
  //   const { prisma } = ctx

  //   return prisma.workoutTemplate.findFirst({
  //     where: {
  //       id: input.id,
  //     },
  //   })
  // }),

  // /**
  //  *  This function updates a workout given workout id, and input to change from the user
  //  *
  //  *  @params ctx - the context object for this function. It is related to the prisma client used for our database operations.
  //  *  @params input - input needed from user in order to update the workout, including the workout id
  //  *  @returns - the updated workout object
  //  */
  // updateWorkout: publicProcedure
  //   .input(
  //     z.object({
  //       id: z.number().int(),
  //       name: z.string().optional(),
  //       description: z.string().optional(),
  //       duration: z.number().int().optional(),
  //       finishedAt: z.date().optional(),
  //       likes: z.number().int().optional(),
  //       exercises: z
  //         .array(
  //           z.object({
  //             id: z.number().int(),
  //             name: z.string(),
  //             note: z.string().optional(),
  //             body_part: z.nativeEnum(BodyPart).optional(),
  //             category: z.nativeEnum(Category).optional(),
  //           }),
  //         )
  //         .optional(),
  //       userId: z.number().int().optional(),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const { prisma } = ctx

  //     return prisma.workout.update({
  //       where: {
  //         id: input.id,
  //       },
  //       data: {
  //         name: input.name,
  //         description: input.description,
  //         duration: input.duration,
  //         finishedAt: input.finishedAt,
  //         likes: input.likes,
  //         exercises: {
  //           updateMany:
  //             input.exercises?.map((exercise) => ({
  //               where: { id: exercise.id },
  //               data: {
  //                 name: exercise.name,
  //                 note: exercise.note,
  //                 body_part: exercise.body_part,
  //                 category: exercise.category,
  //               },
  //             })) ?? [], // if the exercises array is empty then instead of passing a null, it passes an empty array
  //         },
  //         userId: input.userId,
  //       },
  //     })
  //   }),

  // /**
  //  *  This function deletes a workout given an id
  //  *
  //  *  @params ctx - the context object for this function. It is related to the prisma client used for our database operations.
  //  *  @params input - an id from the user that is going to be deleted
  //  */

  // deleteWorkoutFromWorkoutId: publicProcedure
  //   .input(z.object({ id: z.number().int() }))
  //   .query(async ({ ctx, input }) => {
  //     const { prisma } = ctx

  //     return prisma.workout.delete({
  //       where: {
  //         id: input.id,
  //       },
  //     })
  //   }),

  // /**
  //  * This function returns all the exercises inside of a workout
  //  *
  //  *  @params ctx - the context object for this function. It is related to the prisma client used for our database operations.
  //  *  @params input - a workout id associated with the workout we want to extract the exercises from
  //  *  @return an array of all the exercises in a workout object
  //  */

  // getAllExercisesFromWorkoutID: publicProcedure
  //   .input(z.object({ id: z.number().int() }))
  //   .query(async ({ ctx, input }) => {
  //     const { prisma } = ctx

  //     const workout = await prisma.workout.findUnique({
  //       where: {
  //         id: input.id,
  //       },
  //       include: {
  //         exercises: true,
  //       },
  //     })

  //     if (!workout || !workout.exercises) {
  //       return []
  //     }

  //     return workout.exercises
  //   }),

  // /**
  //  * This function would remove an exercise from a workout
  //  *  @params ctx - the context object for this function. It is related to the prisma client used for our database operations.
  //  *  @params input - a workout id, and also an exercise id
  //  */

  // deleteExerciseFromWorkout: publicProcedure
  //   .input(
  //     z.object({
  //       id: z.number().int(),
  //       exerciseID: z.number(),
  //     }),
  //   )
  //   .query(async ({ ctx, input }) => {
  //     const { prisma } = ctx

  //     return prisma.workout.update({
  //       where: {
  //         id: input.id,
  //       },
  //       data: {
  //         exercises: {
  //           disconnect: {
  //             id: input.exerciseID,
  //           },
  //         },
  //       },
  //     })
  //   }),

  // getActivityFeedWorkouts: publicProcedure
  //   .input(
  //     z.object({
  //       friendIds: z.array(z.number().int()),
  //       count: z.number().int()
  //     })
  //   )
  //   .query(({ ctx, input }) => {
  //     const { prisma } = ctx;
  //     return prisma.workout.findMany({
  //       where: {
  //         userId: {
  //           in: input.friendIds
  //         }
  //       },
  //       take: input.count,
  //       orderBy:  {
  //         createdAt: 'desc'
  //       },
  //       include: {
  //         user: true,
  //         exercises: true
  //       }
  //     })
  //   })
})
