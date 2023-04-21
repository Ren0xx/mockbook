import { type RouterOutputs } from "@/utils/api";
import { useSession } from "next-auth/react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Comment from "@/components/Comment";
import Link from "next/link";

type Post = RouterOutputs["post"]["getAll"][0];
type CommentT = RouterOutputs["comment"]["create"];
type PostProps = {
    post: Post;
    deletePost: (id: string) => void;
};
export default function PostCard(props: PostProps) {
    const { data: sessionData } = useSession();
    const { id, title, content, createdAt, comments, author } = props.post;
    const deleteOne = (id: string) => {
        if (author.id !== sessionData?.user.id) return;
        props.deletePost(id);
    };
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
                    <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                        Created by {author.name}
                    </Typography>
                    <Typography variant='body2'>{content}</Typography>
                    <Typography variant='body2'>
                        {comments.map((comment: CommentT) => (
                            <Comment comment={comment} key={comment.id} />
                        ))}
                    </Typography>
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
