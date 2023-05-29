import { type RouterOutputs } from "@/utils/api";
import {
    Avatar,
    Box,
    IconButton,
    Tooltip,
    Typography,
    Paper,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import { format } from "date-fns";
import Link from "next/link";
type Comment = RouterOutputs["comment"]["getAll"][0];
type CommentProps = {
    comment: Comment;
    refetchPost?: () => void;
};
const Comment = (props: CommentProps) => {
    const { data: sessionData } = useSession();
    const { id, content, authorId, postId, createdAt, author } = props.comment;

    const deleteComment = api.comment.delete.useMutation({
        onSuccess: () => {
            if (typeof props.refetchPost === "function") {
                void props.refetchPost();
            }
        },
    });
    const deleteOne = (id: string) => {
        if (authorId !== sessionData?.user.id) return;
        deleteComment.mutate({
            id: id,
        });
    };
    return (
        <Paper
            elevation={4}
            key={id}
            sx={{
                display: "flex",
                gap: "0.7em",
                flexDirection: "column",
                p: "1em",
                m: "0.5em",
                justifyContent: "stretch",
                borderRadius: "1em",
                maxWidth: 550,
            }}>
            <Box
                sx={{
                    display: "flex",
                    gap: "0.7em",

                    justifyContent: "stretch",
                }}>
                <Avatar
                    alt='Profile picture'
                    src={author.image ?? "Profile picture"}
                    component={Link}
                    href={`/profile/${authorId}`}
                    sx={{ width: 32, height: 32, alignSelf: "flex-start" }}
                />
                <Typography>
                    <b>{author.name}</b> posted{" "}
                    {format(createdAt || new Date(), "dd/MM/yyyy 'at' hh:mm")}
                </Typography>
                {authorId === sessionData?.user.id && (
                    <Tooltip title='Delete'>
                        <IconButton onClick={() => deleteOne(id)}>
                            <DeleteForeverIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Box>
            <Box sx={{ ml: "0.6em" }}>
                <p>{content}</p>
            </Box>
        </Paper>
    );
};
export default Comment;
