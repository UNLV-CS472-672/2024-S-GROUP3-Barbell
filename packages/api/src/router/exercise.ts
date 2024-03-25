import { array, z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../trpc'
import { SetType } from '@prisma/client'
import { BodyPart } from '@prisma/client'
import { Category } from '@prisma/client'

export const exerciseRouter = createTRPCRouter ({
    
    /**
     * This function creates a new exercise in the database
     * @params ctx - the context object for this function. It is related to the prisma client used for our database operations.
     * @params input - an object of the different inputs an exercise input needs to be created (name, note, bodyPart, category, and workoutId)
     * @returns the newly created exercise object.
     */
    createNewExercise: publicProcedure
        .input(z.object({
            name: z.string(),
            note: z.string().optional(),
            body_part: z.enum([ BodyPart.LEGS, BodyPart.ARMS, BodyPart.CHEST, BodyPart.BACK, BodyPart.SHOULDERS, BodyPart.CORE, BodyPart.FULL_BODY, BodyPart.OTHER]),
            category: z.enum([Category.BARBELL, Category.DUMBBELL, Category.MACHINE, Category.ASSISTED_BODYWEIGHT, Category.WEIGHTED_BODYWEIGHT
                            , Category.BODYWEIGHT, Category.DURATION, Category.CARDIO, Category.REPS_ONLY, Category.OTHER]),
            workoutId: z.number().int()
        }))
        .mutation(async ({ ctx, input }) => {
            const { prisma } = ctx

            return prisma.exercise.create({
                data:{
                    name: input.name,
                    note: input.note,
                    body_part: input.body_part,
                    category: input.category,
                    workoutId: input.workoutId
                }
            })
        }),

    /**
     * This function returns all the exercises in the database
     * @params ctx - the context object for this function. It is related to the prisma client used for our database operations.
     * @returns an array of all the exercises in our database
     */
    getAllExercises: publicProcedure
        .query(({ctx}) => {
            const { prisma } = ctx

            return prisma.exercise.findMany({
                orderBy: {
                    id: 'desc'
                }
            })
        }),

    /**
     * This function returns a specific exercise using its ID
     *  @params id - the ID of the exercise to be retrieved
     *  @params ctx - the context object for this function. It is related to the prisma client used for our database operations.
     *  @returns an exercise object
     */
    getExerciseFromExerciseId: publicProcedure
        .input(z.object({ id: z.number().int() }))
        .query(async({ctx, input}) => {
            const { prisma } = ctx

            return prisma.exercise.findFirst({
                where:{
                    id: input.id
                }
            })

        }),

    /**
     * This function updates a specific exercise given an id and some field of the exercise
     *  @params ctx - the context object for this function. It is related to the prisma client used for our database operations.
     *  @params input - the updated info for the exercise as well as the id of the exercise
     *  @returns the updated exercise object
     */
    updateExerciseFromExericseID: publicProcedure
        .input(z.object({
            id: z.number().int(),
            name: z.string().optional(),
            note: z.string().optional(),
            sets: z.array(z.object({
                id: z.number(),
                type: z.enum([SetType.DROPSET, SetType.FAILURE, SetType.NORMAL, SetType.WARMUP]),
                reps: z.number().int(),
                weight: z.number(),
                exerciseId: z.number().int()
            })).optional(),
            body_part: z.enum([ BodyPart.LEGS, BodyPart.ARMS, BodyPart.CHEST, BodyPart.BACK, BodyPart.SHOULDERS, BodyPart.CORE, BodyPart.FULL_BODY, BodyPart.OTHER]).optional(),
            category: z.enum([Category.BARBELL, Category.DUMBBELL, Category.MACHINE, Category.ASSISTED_BODYWEIGHT, Category.WEIGHTED_BODYWEIGHT
                            , Category.BODYWEIGHT, Category.DURATION, Category.CARDIO, Category.REPS_ONLY, Category.OTHER]).optional(),
            workoutId: z.number().int().optional()
        }))
        .mutation(async({ctx, input})=>{
            const { prisma } = ctx

            return prisma.exercise.update({
                where: {
                    id: input.id
                },
                data:{
                    name: input.name,
                    note: input.note,
                    sets: {
                        updateMany: input.sets?.map((set)=> ({
                            where: {
                                id: set.id
                            },
                            data:{
                                type: set.type,
                                reps: set.reps,
                                weight: set.weight
                            }
                        })
                    )
                    },
                    body_part: input.body_part,
                    category: input.category,
                    workoutId: input.workoutId,
                }
            })
        })

})

