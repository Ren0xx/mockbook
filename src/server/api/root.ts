import { createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "@/server/api/routers/user";
import { postRouter } from "./routers/post";
import { commentRouter } from "./routers/comment";
import { likeRouter } from "./routers/like";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  post: postRouter,
  comment:  commentRouter,
  like: likeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
