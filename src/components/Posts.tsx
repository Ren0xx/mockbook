import { type RouterOutputs } from "@/utils/api";
import { api } from "@/utils/api";
import PostCard from "./PostCard";
import { Loader, ErrorMessage } from "@/components/Loading";
import styles from "@/styles/post.module.css";
type Post = RouterOutputs["post"]["getAll"][0];
type PostsProps = {
    posts?: Post[];
    isLoading: boolean;
    isError: boolean;
    refetchPosts: () => void;
};
const Posts = (props: PostsProps) => {
    const deletePost = api.post.delete.useMutation({
        onSuccess: () => {
            void props.refetchPosts();
        },
    });

    const deleteOne = (id: string) => {
        deletePost.mutate({
            id: id,
        });
    };
    if (props.isLoading) return <Loader />;
    if (props.isError) return <ErrorMessage />;
    return (
        <div className={styles.posts_container}>
            {props.posts?.map((post: Post) => (
                <PostCard
                    post={post}
                    deletePost={deleteOne}
                    key={post.id}
                    refetchPosts={props.refetchPosts}
                />
            ))}
        </div>
    );
};
export default Posts;
