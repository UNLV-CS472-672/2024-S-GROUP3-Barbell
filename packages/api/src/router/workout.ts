import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../trpc'

export const workoutRouter = createTRPCRouter({
    /**
     * This function creates a new workout in the database.
     * 
     * @params ctx - the context object for this function. It is related to the prisma client used for our database operations.
     * @params input - contains the input needed to created the workout, the individual inputs are
     *          - name: the name of the workout
     *          - description: the description of the workout
     *          - duration: the duration of the workout
     *          - finishedAt: the date and time the workout was finished
     *          - exercises: an array of exercise objects, they are the individual exercises that make up the workout
     *              - name: the name of the exercise
     *              - note: an optional note that describes the exercise
     *              - body_part: the body part that the exercise targets
     *              - category: the type of exercise it is
     *          - userId: the ID of the user that created the workout 
     * @returns the newly created workout object
     */
    createNewWorkout: publicProcedure
        .input(z.object({
                name: z.string(),
                description: z.string().optional(),
                duration: z.number().int(),
                finishedAt: z.date(),
                exercises: z.array(z.object({
                    name: z.string(),
                    note: z.string().optional(),
                    // ExerciseCreateWithoutWorkoutInput calls SetCreateNestedManyWithoutExerciseInput which means that the sets field isn't needed?
                    // this should be the case because the exercises are already linked to the appropriate sets
                    // sets: z.array(z.object({
                    //     type: z.enum(['NORMAL', 'WARMUP', 'DROPSET', 'FAILURE']),
                    //     reps: z.number().int().nonnegative(),
                    //     weight: z.number().nonnegative(),
                    //     exerciseID: z.number().int()
                    // })),
                    body_part: z.enum(['LEGS', 'ARMS', 'CHEST', 'BACK', 'SHOULDERS', 'CORE', 'FULL_BODY', 'OTHER']),
                    category: z.enum(['BARBELL', 'DUMBBELL', 'MACHINE', 'ASSISTED_BODYWEIGHT', 'WEIGHTED_BODYWEIGHT'
                                        , 'BODYWEIGHT', 'DURATION', 'CARDIO', 'REPS_ONLY', 'OTHER']),
                })),

                // Past workouts should not be needed since there is no history of it being used if it was newly created
                // past_workouts: z.array(z.object({
                //     createdAt: z.date(),
                //     updatedAt: z.date(),
                //     finishedAt: z.date(),
                //     userId: z.number().int(),
                // })),
                userId: z.number().int()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { prisma } = ctx
            
            return prisma.workout.create({
                data: {
                    name: input.name,
                    description: input.description,
                    duration: input.duration,
                    finishedAt: input.finishedAt,
                    exercises: {
                        create: input.exercises
                    },
                    userId: input.userId
                }
            })
        }),

    /**
     *  @remarks 
     *  This function returns all of the workouts from our database.
     *  The workouts are ordered by their ID in descending order when they are returned.
     * 
     * @params ctx - the context object for this function. It is related to the prisma client used for our database operations.
     * @returns an array of workout objects
     */

    getAllWorkouts: publicProcedure
        .query(({ ctx }) => {
            const { prisma } = ctx

            return prisma.workout.findMany({
                orderBy: {
                    id: 'desc'
                }
            })
        }),
    
    /**
     * This function returns a workout by its ID
     * 
     * @params id - the ID of the workout that is to be retrieved
     * @params ctx - the context object for this function. It is related to the prisma client used for our database operations.
     */

    getWorkoutFromID: publicProcedure
        .input(z.object({ id: z.number() }))
        .query(({ ctx, input }) => {
            const { prisma } = ctx

            return prisma.workout.findFirst({
                where: {
                    id: input.id
                }
            })
        }),

    /**
     *  This function would update a workout
     */
    // updateWorkout: publicProcedure
    //     .input(z.object({}),)

    
})