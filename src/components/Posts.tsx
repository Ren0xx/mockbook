import { type RouterOutputs } from "@/utils/api";
import { api } from "@/utils/api";
import PostCard from "./PostCard";
type Post = RouterOutputs["post"]["getAll"][0];
type PostsProps = {
    posts?: Post[];
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
    return (
        <div>
            {props.posts?.map((post: Post) => (
                <PostCard post={post} deletePost={deleteOne}/>
            ))}
        </div>
    );
};
export default Posts;
