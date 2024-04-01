import { z } from 'zod';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';

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
   * Get friends for the current user
   */
getFriends: protectedProcedure
.query(async ({ ctx }) => {
  const currentUserId = ctx.session.user.id;

  const friends = await ctx.prisma.friend.findMany({
    where: {
      userId: currentUserId,
    },
    select: {
      user: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
    },
  });

  return friends.map((friend) => friend.user);
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