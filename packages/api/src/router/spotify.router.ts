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
  getSpotifyDataFromUserId: publicProcedure.input(z.object({ id: z.number().int() })).query(async ({ ctx, input }) => {
    const { prisma } = ctx

    return prisma.spotifyData.findUnique({
      where: {
        userID: input.id,
      },
    })
  }),

  /**
   * This function creates a new SpotifyData entry based on the provided userID
   *
   * @params ctx - Context object for the function
   * @params object - user input for data to populate row
   */
  createSpotifyData: publicProcedure
    .input(
      z.object({
        albumImageURL: z.string().optional(),
        albumName: z.string().optional(),
        artist: z.string().optional(),
        isPlaying: z.boolean(),
        songURL: z.string().optional(),
        title: z.string().optional(),
        timePlayed: z.number().optional(),
        timeTotal: z.number().optional(),
        artistURL: z.string().optional(),
        userID: z.number().int(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const { prisma } = ctx

      return prisma.spotifyData.create({
        data: {
          albumImageURL: input.albumImageURL,
          albumName: input.albumName,
          artist: input.artist,
          isPlaying: input.isPlaying,
          songURL: input.songURL,
          title: input.title,
          timePlayed: input.timePlayed,
          timeTotal: input.timeTotal,
          artistURL: input.artistURL,
          userID: input.userID,
        },
      })
    }),

  /**
   * This function updates a row in SpotifyData based on provided input
   *
   * @params ctx - Context object for the function
   * @params object - New data + userID to identify the row
   * @returns - updated spotify object
   */
  updateSpotifyData: publicProcedure
    .input(
      z.object({
        // Don't see a need to pass the id, only need userID to update. Won't be indexing by id itself, nor should it be updated.
        id: z.number().int().optional(),
        albumImageURL: z.string().optional(),
        albumName: z.string().optional(),
        artist: z.string().optional(),
        isPlaying: z.boolean().optional(),
        songURL: z.string().optional(),
        title: z.string().optional(),
        timePlayed: z.number().optional(),
        timeTotal: z.number().optional(),
        artistURL: z.string().optional(),
        userID: z.number().int(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const { prisma } = ctx

      return prisma.spotifyData.update({
        where: {
          // Shouldn't update IDs at all. That would be bad to say the least.
          userID: input.userID,
        },
        data: {
          albumImageURL: input.albumImageURL,
          albumName: input.albumName,
          artist: input.artist,
          isPlaying: input.isPlaying,
          songURL: input.songURL,
          title: input.title,
          timePlayed: input.timePlayed,
          timeTotal: input.timeTotal,
          artistURL: input.artistURL,
        },
      })
    }),

  /**
   * Delete an entry in SpotifyData given a uniqueID
   *
   * @params ctx - Context object for function, related to prisma client
   * @params id - unique id to determine which row to remove from DB
   */
  deleteSpotifyDataFromUserId: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx

      return prisma.spotifyData.delete({
        where: {
          userID: input.id,
        },
      })
    }),
})
