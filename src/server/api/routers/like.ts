import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const likeRouter = createTRPCRouter({
    add: protectedProcedure
        .input(z.object({ postId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.prisma.like.create({
                data: {
                    postId: input.postId,
                    userId: ctx.session.user.id,
                }
            });
        }),
    remove: protectedProcedure.input(z.object({ likeId: z.string() })).mutation(async ({ ctx, input }) => {
        return ctx.prisma.like.delete({
            where: { id: input.likeId }
        });
    }),
});