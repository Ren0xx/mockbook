import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
    hello: publicProcedure
        .query(() => {
            return {
                greeting: `Hello`,
            };
        }),

    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.user.findMany();
    }),

});

