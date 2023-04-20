import { type RouterOutputs } from "@/utils/api";
type Comment = RouterOutputs["comment"]["delete"];
type CommentProps = {
    comment: Comment;
};
const Comment = (props: CommentProps) => {
    const { id, content, authorId, postId, createdAt } = props.comment;
    return (
        <div key={id}>
            <p>{content}</p>
        </div>
    );
};
export default Comment;
