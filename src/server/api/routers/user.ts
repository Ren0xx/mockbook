import { z } from "zod";
import { User } from "@prisma/client";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "@/server/api/trpc";


export const userRouter = createTRPCRouter({
    getOne: protectedProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
        return ctx.prisma.user.findUnique({
            where: { id: input.id }, include: {
                friends: true, posts: {
                    include: {
                        comments: true,
                        author: true,
                        likes: true
                    }
                }
            }
        });
    }),
    deleteOne: protectedProcedure.mutation(async ({ ctx }) => {
        return ctx.prisma.user.delete({ where: { id: ctx.session.user.id } });
    }),

    updateDescription: protectedProcedure.input(z.object({ description: z.string() })).mutation(async ({ ctx, input }) => {
        return ctx.prisma.user.update({
            where: { id: ctx.session.user.id },
            data: {
                description: input.description
            }
        });
    }),
    getNewest: protectedProcedure.query(({ ctx }) => {
        const loggedInUserId = ctx.session.user.id;

        return ctx.prisma.user.findMany({
            include: { friends: true, friendsOf: true },
            where: {
                AND: [
                    { id: { not: loggedInUserId } }, // exclude logged in user
                    { NOT: { friends: { some: { id: loggedInUserId } } } }, // exclude friends of logged in user
                    { NOT: { friendsOf: { some: { id: loggedInUserId } } } }, // exclude users who have logged in user as friend
                ],
            },
            take: 10,
        });
    }),

    addFriend: protectedProcedure.input(z.object({ id: z.string() })).mutation(({ ctx, input }) => {
        return ctx.prisma.user.update({
            where: { id: ctx.session.user.id },
            data: {
                friends: {
                    connect: {
                        id: input.id
                    },
                },
            },
        });
    }),
    removeFriend: protectedProcedure.input(z.object({ id: z.string() })).mutation(({ ctx, input }) => {
        return ctx.prisma.user.update({
            where: { id: ctx.session.user.id },
            data: {
                friends: {
                    disconnect: {
                        id: input.id
                    },
                },
            },
        });
    }),
    getDescription: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.user.findUnique({
            where: { id: ctx.session.user.id },
            select: { description: true }

        });
    }),

    updateProfilePicture: protectedProcedure
        .input(z.object({ urlPath: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.prisma.user.update({
                where: { id: ctx.session.user.id },
                data: {
                    image: input.urlPath
                }
            });

        }),
});

