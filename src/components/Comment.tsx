import { type RouterOutputs } from "@/utils/api";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
type Comment = RouterOutputs["comment"]["delete"];
type CommentProps = {
    comment: Comment;
    refetchPost?: () => void;
};
const Comment = (props: CommentProps) => {
    const { data: sessionData } = useSession();
    const { id, content, authorId, postId, createdAt } = props.comment;

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
        <div key={id}>
            <p>{content}</p>
            {authorId === sessionData?.user.id && (
                <Button
                    size='small'
                    variant='contained'
                    color='error'
                    onClick={() => deleteOne(id)}>
                    Delete comment
                </Button>
            )}
        </div>
    );
};
export default Comment;
