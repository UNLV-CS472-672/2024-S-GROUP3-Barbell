import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../trpc'

export const workoutRouter = createTRPCRouter({
    /**
     * This function creates a new workout
     */
    // createNewWorkout: publicProcedure
    //     .input(z.object({
    //             name: z.string(),
    //             description: z.string().optional(),
    //             duration: z.number().int(),
    //             finishedAt: z.date(),
    //             exercises: z.array(z.object({
    //                 name: z.string(),
    //                 note: z.string().optional(),
    //                 sets: z.array(z.object({
    //                     id: z.number().int(),
    //                     type: z.enum(['NORMAL', 'WARMUP', 'DROPSET', 'FAILURE']),
    //                     reps: z.number().int().nonnegative(),
    //                     weight: z.number().nonnegative(),
    //                     exerciseID: z.number().int()
    //                 })),
    //                 bodyPart: z.enum(['LEGS', 'ARMS', 'CHEST', 'BACK', 'SHOULDERS', 'CORE', 'FULL_BODY', 'OTHER']),
    //                 category: z.enum(['BARBELL', 'DUMBELLS', 'MACHINE', 'ASSISTED_BODYWEIGHT', 'WEIGHTED_BODYWEIGHT'
    //                                     , 'BODYWEIGHT', 'DURATION', 'CARDIO', 'REPS_ONLY', 'OTHER']),
    //                 workoutId: z.number().int()
    //             })),
    //             past_workouts: z.array(z.object({
    //                 id: z.number().int(),
    //                 createdAt: z.date(),
    //                 updatedAt: z.date(),
    //                 finishedAt: z.date(),
    //                 userId: z.number().int(),
    //                 workoutId: z.number().int()
    //             })),
    //             userId: z.number().int()
    //         })
    //     )
    //     .mutation(async ({ ctx, input }) => {
    //         const { prisma } = ctx
            
    //         return prisma.workout.create({
    //             data: {
    //                 name: input.name,
    //                 description: input.description,
    //                 duration: input.duration,
    //                 finishedAt: input.finishedAt,
    //                 exercises: {
    //                     create: input.exercises
    //                 },
    //                 past_workouts: {
    //                     create: input.past_workouts
    //                 },
    //                 userId: input.userId
    //             }
    //         })
    //     }),

    /**
     *  @remarks 
     *  This function returns all of the workouts from our database.
     *  The workouts are ordered by their ID in descending order when they are returned.
     * 
     * @params ctx - the context object for this function. It is related to the prisma client used for our database operations.
     * @returns an array of workout objects
     */

    getAllWorkouts: publicProcedure
        .query(async ({ ctx }) => {
            const { prisma } = ctx

            return prisma.workout.findMany({
                orderBy: {
                    id: 'desc'
                }
            })
        }),
    
    /**
     * This function returns a workout by its ID
     */

    getWorkoutByID: publicProcedure
        .input(z.object({ id: z.number() }))
        .query(async ({ ctx, input }) => {
            const { prisma } = ctx

            return prisma.workout.findFirst({
                where: {
                    id: input.id
                }
            })
        })

    /**
     *  This function would update 
     */

    
})