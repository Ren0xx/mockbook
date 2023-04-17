import { z } from 'zod';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const commentRouter = createTRPCRouter({
    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.comment.findMany({});
    }),
    // getOne: protectedProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
    //     return ctx.prisma.comment.findUnique({ where: { id: input.id } });
    // }),
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