import {z} from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const workoutLogRouter = createTRPCRouter({

    /*  This function just returns a single workout log by userID
        @params ctx - The context for this object
        @params input - User input to query (userID and unique id)
        @returns - Single workout log by input userID
    */
   getWorkoutLogByID: publicProcedure
   .input(
        z.object({
            id: z.number().int()
        })
   )
   .query(async ({ctx, input}) => {
        const {prisma} = ctx
        const workoutLog = await prisma.workoutLog.findUnique({
            where: {
                id: input.id
            }
        })
   }),

    // This function just returns a list of workout logs by user ID
    // @params ctx - the context object for this function.
    // @params input - input needed from user needed to get workout logs
    // @returns - list of workout logs for that user in ascending order by finished date
    getWorkoutLogsByUserID: publicProcedure
    .input(
        z.object({
            userId: z.number().int()
        })
    )
    .query(async ({ctx, input}) => {
        const {prisma} = ctx
        const workoutLogs = await prisma.workoutLog.findMany({
            where: {
                userId: input.userId
            },
            orderBy: {
                finishedAt: 'asc'
            }
        })
    }),

    /*  This function creates a new workout log by userID
        @params ctx - The context for this object
        @params input - User input to query (userID) + data
        @returns - Newly created workout log
    */
    createNewWorkoutLog: publicProcedure
    .input(
        z.object({
            finishedAt: z.date().optional(), //As is default to now()
            duration: z.number().int(),
            userId: z.number().int(),
            workoutTemplateId: z.number().int()
        })
    )
    .mutation(async ({ctx, input}) => {
        const {prisma} = ctx
        // Just create a new workout log
        return prisma.workoutLog.create({
            data: {
                finishedAt: input.finishedAt,
                duration: input.duration,
                userId: input.userId,
                workoutTemplateId: input.workoutTemplateId
            }
        })
    }),

    /*  This function updates a single workoutLog by its uniqueID
        @params ctx - The context for this object
        @params input - User input to update the log, id data
        @returns - Updated log
    */

    // 
    //Which fields should be optional?
    //UpdatedAt is handled by @updatedAt
    updateWorkoutLog: publicProcedure
    .input(
        z.object({
            id: z.number().int(),
            finishedAt: z.date().optional(), //Should only be updated
        })
    )
    .mutation(async ({ctx, input}) => {
        const {prisma} = ctx

        return prisma.workoutLog.update({
            where: {
                id: input.id,
                userId: input.userId,

            },
            data : {
                finishedAt: input.finishedAt
            }
        })
    })

})