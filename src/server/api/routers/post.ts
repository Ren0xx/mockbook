import { z } from 'zod';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const postRouter = createTRPCRouter({
    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.post.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: { comments: true, author: true },
            take: 50 // limit to 50 records
        });
    }),
    getOne: protectedProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
        return ctx.prisma.post.findUnique({ where: { id: input.id }, include: { comments: true, author: true } });
    }),
    create: protectedProcedure
        .input(z.object({ title: z.string(), content: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.post.create({
                data: {
                    title: input.title,
                    content: input.content,
                    authorId: ctx.session.user.id,
                }
            });
        }),
    delete: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
        return ctx.prisma.post.delete({ where: { id: input.id } });
    }),
    update: protectedProcedure.input(z.object({ id: z.string(), title: z.string(), content: z.string() })).mutation(async ({ ctx, input }) => {
        return ctx.prisma.post.update({
            where: { id: input.id, },
            data: {
                title: input.title,
                content: input.content
            },
        });
    })
});