import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const friendRouter = createTRPCRouter({
  /**
   * Get all friends
   */
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.friend.findMany({
      orderBy: { id: 'asc' },
      include: { user: true },
    });
  }),

  /**
   * Get friend by id
   */
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.friend.findFirst({
        where: { id: input.id },
        include: { user: true },
      });
    }),

  /**
   * Create a friend
   */
  create: publicProcedure
    .input(
      z.object({
        userId: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.friend.create({
        data: {
          user: { connect: { id: input.userId } },
        },
        include: { user: true },
      });
    }),

  /**
   * Delete a friend
   */
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.friend.delete({
        where: { id: input.id },
      });
    }),

  /**
   * Update a friend: UNUSED, but here for reference
   */
//   update: publicProcedure
//     .input(
//       z.object({
//         id: z.number(),
//         userId: z.number().optional(),
//       })
//     )
//     .mutation(({ ctx, input }) => {
//       return ctx.prisma.friend.update({
//         where: { id: input.id },
//         data: {
//           user: input.userId ? { connect: { id: input.userId } } : undefined,
//         },
//         include: { user: true },
//       });
//     }),
});