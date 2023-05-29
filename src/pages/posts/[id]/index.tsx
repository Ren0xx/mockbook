import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Head from "next/head";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";

import CommentForm from "@/components/Forms/CommentForm";
import Comment from "@/components/Comment";
import SignIn from "@/components/SignIn";
import PostCard from "@/components/PostCard";
import { Loader, ErrorMessage, PageLoader } from "@/components/Loading";
import { type RouterOutputs } from "@/utils/api";
type CommentT = RouterOutputs["comment"]["getAll"][0];

type Post = RouterOutputs["post"]["getAll"][0];
export default function Post() {
    const { data: sessionData } = useSession();
    const router = useRouter();
    const postId = router.query.id as string;
    const {
        data: post,
        isLoading,
        isError,
        refetch,
    } = api.post.getOne.useQuery(
        { id: postId },
        { enabled: sessionData?.user !== undefined }
    );
    const refetchPost = () => void refetch();
    const deletePost = api.post.delete.useMutation({
        onSuccess: () => {
            void router.push("/");
        },
    });

    const deleteOne = (id: string) => {
        deletePost.mutate({
            id: id,
        });
    };
    if (!sessionData) {
        return <SignIn />;
    }
    if (isError) return <ErrorMessage />;
    if (isLoading) return <PageLoader />;
    return (
        <Box sx={{ p: "5em" }}>
            <Head>
                <title>{post?.title || "Post title"} - Mockbook</title>
            </Head>
            <Box
                // justifyContent='center'
                // alignItems='center'
                // spacing={2}
                sx={{ my: "2em" }}>
                <PostCard
                    post={post!}
                    refetchPosts={refetchPost}
                    deletePost={deleteOne}
                />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                    <CommentForm postId={postId} refetchPost={refetchPost} />
                    <Typography variant='h5' sx={{ mb: "1.5em" }}>
                        Comments section
                    </Typography>
                    {post?.comments && post?.comments.length > 0 ? (
                        post?.comments.map((comment: CommentT) => (
                            <Comment
                                comment={comment}
                                key={comment.id}
                                refetchPost={refetchPost}
                            />
                        ))
                    ) : (
                        <div>No comments yet.</div>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
