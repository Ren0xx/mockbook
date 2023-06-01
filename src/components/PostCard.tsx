import { type RouterOutputs } from "@/utils/api";
import { useSession } from "next-auth/react";
import {
    Avatar,
    Box,
    Card,
    CardActions,
    CardContent,
    Typography,
    Tooltip,
    IconButton,
} from "@mui/material";
import { format } from "date-fns";
import Link from "next/link";
import PostBottomBar from "@/components/PostBottomBar";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
type Post = RouterOutputs["post"]["getAll"][0];
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
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                mr: "0.7em",
            }}>
            <Card
                sx={{
                    alignSelf: "center",
                    display: "flex",
                    width: "100%",
                }}>
                <CardContent
                    sx={{
                        alignSelf: "center",
                    }}>
                    <Box
                        sx={{
                            display: "flex",
                            gap: "0.6em",
                            alignItems: "center",
                        }}>
                        <Avatar
                            alt='Profile picture'
                            src={author.image ?? "Profile picture"}
                            component={Link}
                            href={`/profile/${author?.id}`}
                        />

                        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                            <Link href={`/profile/${author.id}`}>
                                <strong> {author.name}</strong> posted on{" "}
                                {format(createdAt, "dd/MM/yyyy ")}
                            </Link>
                        </Typography>
                        <CardActions sx={{ ml: "auto" }}>
                            {author.id === sessionData?.user.id && (
                                <Tooltip title='Delete'>
                                    <IconButton onClick={() => deleteOne(id)}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </CardActions>
                    </Box>
                    <Typography
                        variant='h4'
                        color='text.secondary'
                        gutterBottom>
                        <Link href={`/posts/${id}`}>{title}</Link>
                    </Typography>
                    <Typography sx={{ py: "0.8em" }} variant='body1'>
                        {content}
                    </Typography>
                    <PostBottomBar
                        numberOfLikes={likes.length}
                        numberOfComments={comments.length}
                        postId={id}
                        isLiked={hasLikeWithUserId}
                        likeId={likeId}
                        refetchPosts={props.refetchPosts}
                    />
                </CardContent>
            </Card>
        </Box>
    );
}
