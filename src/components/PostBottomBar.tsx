import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Box, IconButton } from "@mui/material";
import styles from "@/styles/post.module.css";
import { api } from "@/utils/api";
type PostProps = {
    numberOfLikes: number;
    numberOfComments: number;
    postId: string;
    isLiked: boolean;
    likeId?: string;
};
const PostBottomBar = (props: PostProps) => {
    const { numberOfLikes, numberOfComments, postId, isLiked, likeId } = props;
    const createLike = api.like.add.useMutation({});
    const deleteLike = api.like.remove.useMutation({});
    const addLike = (postId: string) => {
        createLike.mutate({
            id: postId,
        });
    };
    const removeLike = (likeId: string) => {
        deleteLike.mutate({
            id: likeId || "",
        });
    };
    const removeOrAddLike = (postId: string, likeId: string) => {
        if (isLiked) {
            removeLike(likeId);
            return;
        }
        addLike(postId);
    };
    return (
        <div className={styles.container}>
            <div>
                <IconButton
                    onClick={() => {
                        removeOrAddLike(postId, likeId || "");
                    }}>
                    <ThumbUpIcon color='success' />
                </IconButton>
                <p>{numberOfLikes}</p>
            </div>
            {isLiked}
            <p>{numberOfComments}</p>
        </div>
    );
};
export default PostBottomBar;
