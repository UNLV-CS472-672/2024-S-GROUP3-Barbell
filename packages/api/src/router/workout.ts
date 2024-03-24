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

    getWorkoutFromWorkoutID: publicProcedure
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
     *  This function would update a workout given workout id, and input to change from the user
     * 
     *  @params ctx - the context object for this function. It is related to the prisma client used for our database operations.
     *  @params input - input needed from user in order to update the workout, including the workout id
     *  @returns - the updated workout object
     */
    updateWorkout: publicProcedure
        .input ( z.object({
            id: z.number(),
            name: z.string().optional(),
            description: z.string().optional(),
            duration: z.number().int().optional(),
            finishedAt: z.date().optional(),
            likes: z.number().int().optional(),
            exercises: z.array(z.object({
                id: z.number(),
                name: z.string(),
                note: z.string().optional(),
                body_part: z.enum(['LEGS', 'ARMS', 'CHEST', 'BACK', 'SHOULDERS', 'CORE', 'FULL_BODY', 'OTHER']).optional(),
                category: z.enum(['BARBELL', 'DUMBBELL', 'MACHINE', 'ASSISTED_BODYWEIGHT', 'WEIGHTED_BODYWEIGHT'
                , 'BODYWEIGHT', 'DURATION', 'CARDIO', 'REPS_ONLY', 'OTHER']).optional(),
            })).optional(),
            userId: z.number().int().optional()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { prisma } = ctx

            return prisma.workout.update({
                where: {
                    id: input.id
                },
                data: {
                    name: input.name,
                    description: input.description,
                    duration: input.duration,
                    finishedAt: input.finishedAt,
                    likes: input.likes,
                    exercises: {
                        updateMany: input.exercises?.map((exercise) => ({
                            where: { id: exercise.id },
                            data: { 
                                name: exercise.name,
                                note: exercise.note,
                                body_part: exercise.body_part,
                                category: exercise.category
                            }
                        })) ?? [] , // if the exercises array is empty then instead of passing a null, it passes an empty array
                    },
                    userId: input.userId
                }
            })
        }),
    
    /**
     *  This function would delete a workout given an id
     *  
     *  @params - 
     *  @return
     */
})