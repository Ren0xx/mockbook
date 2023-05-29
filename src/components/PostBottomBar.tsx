import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { IconButton } from "@mui/material";
import styles from "@/styles/post.module.css";
import useLike from "@/utils/useLike";
import Link from "next/link";
type PostProps = {
    numberOfLikes: number;
    numberOfComments: number;
    postId: string;
    isLiked: boolean;
    likeId?: string;
    refetchPosts: () => void;
};
const PostBottomBar = (props: PostProps) => {
    const { numberOfLikes, numberOfComments, postId, isLiked, likeId } = props;
    const refetch = () => void props.refetchPosts();
    const { liked, likeOrDislike, isDisabled } = useLike(
        postId,
        isLiked,
        refetch,
        likeId
    );
    return (
        <div className={styles.container}>
            <div>
                <IconButton
                    onClick={() => {
                        void likeOrDislike();
                    }}
                    disabled={isDisabled}>
                    <ThumbUpIcon color={liked ? "primary" : "disabled"} />
                </IconButton>
                <p>
                    {numberOfLikes} {numberOfLikes === 1 ? "like" : "likes"}
                </p>
            </div>
            <Link href={`/posts/${postId}`}>
                {numberOfComments}{" "}
                {numberOfComments === 1 ? "comment" : "comments"}
            </Link>
        </div>
    );
};
export default PostBottomBar;
