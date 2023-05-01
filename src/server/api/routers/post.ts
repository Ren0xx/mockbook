import { z } from 'zod';
import { env } from '@/env.mjs';
import { Redis } from 'ioredis';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

import { Post, Comment, Like, User } from '@prisma/client';
const client = new Redis(env.REDIS_URL);

type PostsInfo = (Post & { comments: Comment[], likes: Like[], author: User; })[];
export const postRouter = createTRPCRouter({
    getAll: protectedProcedure.query(async ({ ctx }) => {

        const cache = await client.get("posts");
        if (cache) {
            return JSON.parse(cache) as PostsInfo;
        }
        const data = await ctx.prisma.post.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: { comments: true, author: true, likes: true },
            take: 50 // limit to 50 records
        });
        await client.set("posts", JSON.stringify(data));
        await client.expire("posts", 100);
        return data;
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
    }),
    allOfUser: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
        const cache = await client.get("userposts");
        if (cache) {
            return JSON.parse(cache) as PostsInfo;
        }

        const data = await ctx.prisma.post.findMany({
            where: { authorId: input.id },
            orderBy: {
                createdAt: 'desc'
            },
            include: { comments: true, author: true, likes: true },
            take: 50
        });
        await client.set("userposts", JSON.stringify(data));
        await client.expire("userposts", 1000);
        return data;
    }),
    // allOfS: protectedProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
    //     return ctx.prisma.user.findUnique({
    //         where: { id: input.id },
    //         include: { posts: true }
    //     });
    // }),
    allOfUserLiked: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.user.findUnique({
            where: { id: ctx.session.user.id },
            include: {
                likes: {
                    include: {
                        post: {
                            include: {
                                author: true,
                            },
                        },
                    },
                },
            },
        });
    })

});