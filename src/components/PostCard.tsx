import { type RouterOutputs } from "@/utils/api";
import { useSession } from "next-auth/react";

import {
    Avatar,
    Box,
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
} from "@mui/material";
import Comment from "@/components/Comment";
import Link from "next/link";
import PostBottomBar from "@/components/PostBottomBar";
type Post = RouterOutputs["post"]["getAll"][0];
type CommentT = RouterOutputs["comment"]["create"];
type PostProps = {
    post: Post;
    deletePost: (id: string) => void;
    refetchPosts: () => void;
};
export default function PostCard(props: PostProps) {
    const { data: sessionData } = useSession();
    const { id, title, content, createdAt, comments, likes, author } =
        props.post;
    const deleteOne = (id: string) => {
        if (author.id !== sessionData?.user.id) return;
        props.deletePost(id);
    };
    const hasLikeWithUserId = likes.some(
        (like) => like.userId === sessionData?.user.id
    );
    const likeOfAuthor = likes.find(
        (like) => like.userId === sessionData?.user.id
    );
    const likeId = likeOfAuthor?.id || "";
    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography
                        variant='h4'
                        color='text.secondary'
                        gutterBottom>
                        <Link href={`/posts/${id}`}>{title}</Link>
                    </Typography>
                    <Avatar
                        alt='Profile picture'
                        src={author.image ?? "Profile picture"}
                        component={Link}
                        href={`/profile/${author?.id}`}
                    />
                    <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                        <Link href={`/profile/${author.id}`}>
                            Created by {author.name}
                        </Link>
                    </Typography>
                    <Typography variant='body2'>{content}</Typography>
                    <hr />
                    {/* <Typography variant='body2'>
                        {comments.map((comment: CommentT) => (
                            <Comment comment={comment} key={comment.id} />
                        ))}
                    </Typography> */}
                    <PostBottomBar
                        numberOfLikes={likes.length}
                        numberOfComments={comments.length}
                        postId={id}
                        isLiked={hasLikeWithUserId}
                        likeId={likeId}
                        refetchPosts={props.refetchPosts}
                    />
                </CardContent>
                {author.id === sessionData?.user.id && (
                    <CardActions>
                        <Button size='small' onClick={() => deleteOne(id)}>
                            Delete post
                        </Button>
                    </CardActions>
                )}
            </Card>
        </>
    );
}
