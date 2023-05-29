import { z } from 'zod';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const commentRouter = createTRPCRouter({
    getAll: protectedProcedure.input(z.object({ postId: z.string() })).query(({ ctx, input }) => {
        return ctx.prisma.comment.findMany({ where: { postId: input.postId }, include: { author: true } });
    }),
    create: protectedProcedure
        .input(z.object({ content: z.string(), postId: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.comment.create({
                data: {
                    content: input.content,
                    postId: input.postId,
                    authorId: ctx.session.user.id,
                }
            });
        }),
    delete: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
        return ctx.prisma.comment.delete({
            where: { id: input.id }
        });
    }),
    update: protectedProcedure.input(z.object({ id: z.string(), content: z.string() })).mutation(async ({ ctx, input }) => {
        return ctx.prisma.comment.update({
            where: { id: input.id, },
            data: {
                content: input.content
            },
        });
    })
});