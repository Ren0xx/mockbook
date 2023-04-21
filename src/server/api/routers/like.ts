import { z } from 'zod';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const likeRouter = createTRPCRouter({
    add: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.like.create({
                data: {
                    postId: input.id,
                    userId: ctx.session.user.id,
                }
            });
        }),
    remove: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
        return ctx.prisma.like.delete({
            where: { id: input.id }
        });
    }),
});