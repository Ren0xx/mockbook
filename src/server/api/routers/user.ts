import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
    getOne: protectedProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
        return ctx.prisma.user.findUnique({ where: { id: input.id }, include: { friends: true } });
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

});

