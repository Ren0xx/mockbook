import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import { api } from "@/utils/api";
import { type RouterOutputs } from "@/utils/api";
import { useSession } from "next-auth/react";
import CommentForm from "@/components/Forms/CommentForm";
import Comment from "@/components/Comment";
import SignIn from "@/components/SignIn";
type CommentT = RouterOutputs["comment"]["delete"];
type Post = RouterOutputs["post"]["getOne"];
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
    if (!sessionData) {
        return <SignIn />;
    }
    if (isError) return <p>Error fetching</p>;
    if (isLoading) return <p>Loading...</p>;
    return (
        <>
            <div>
                <p>{post?.title}</p>
                <p>{post?.content}</p>
                <p>{post?.author.name}</p>
            </div>
            <hr />
            <div>
                <Typography variant='h5'>Comments section</Typography>
                {post?.comments.map((comment: CommentT) => (
                    <Comment comment={comment} />
                ))}
                <CommentForm postId={postId} refetchPosts={refetch} />
            </div>
        </>
    );
}
