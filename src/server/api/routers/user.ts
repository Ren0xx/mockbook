import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
    deleteOne: protectedProcedure.mutation(async ({ ctx }) => {
        //delete all user posts
        const deletePosts = ctx.prisma.post.deleteMany({
            where: { authorId: ctx.session.user.id }
        });
        //delete all user comments
        const deleteComments = ctx.prisma.comment.deleteMany({
            where: { authorId: ctx.session.user.id }
        });
        return ctx.prisma.$transaction([deletePosts, deleteComments]);
    }),

    updateDescription: protectedProcedure.input(z.object({ description: z.string() })).mutation(async ({ ctx, input }) => {
        return ctx.prisma.user.update({
            where: { id: ctx.session.user.id },
            data: {
                description: input.description
            }
        });
    }),

});

