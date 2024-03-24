import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

// gwat
//import { SpotifyData } from '@prisma/client'

// Create the router for spotify
export const spotifyRouter = createTRPCRouter({

    /**
    * This function returns a spotify row by unique ID (from user)
    * 
    * @params ctx - context object for the function. Related to prisma client.
    * @params id - unique id used to determine which row to return from query
    *  
    */
    getSpotfiyDataFromUserId: publicProcedure
        .input(z.object({ id: z.number() }))
        .query(async ({ctx, input}) => {
            const { prisma } = ctx

            return prisma.spotifyData.findUnique({
                where: {
                    id: input.id
                }
            })
        }),


    /**
     * This function creates a new SpotifyData entry based on the provided userID
     * 
     * @params ctx - Context object for the function
     * @params object - user input for data to populate row
    */
   createSpotifyData: publicProcedure
        .input(z.object({

        }))
        .mutation(({ ctx, input }) => {
            const { prisma } = ctx
            data: {
                
            }
        }),

    /**
     * This function updates a row in SpotifyData based on provided input
     * 
     * @params ctx - Context object for the function
     * @params object - New data + userID to identify the row
    */
   updateSpotifyData: publicProcedure
        .input(z.object({

        }))
        .mutation(({ ctx, input }) => {
            const { prisma } = ctx
            data: {

            }
            
        }),

    /**
     * Delete an entry in SpotifyData given a uniqueID
     * 
     * @params ctx - Context object for function, related to prisma client
     * @params id - unique id to determine which row to remove from DB
    */
   deleteSpotifyDataFromUserId: publicProcedure
        .input(z.object({ id: z.number() }))
        .query(async({ctx, input}) => {
            const { prisma } = ctx

            return prisma.spotifyData.delete({
                where: {
                    id: input.id
                }
            })
        }),

})