import { type RouterOutputs } from "@/utils/api";
import { Like } from "@prisma/client";
import { api } from "@/utils/api";
import PostCard from "./PostCard";
import { Loader, ErrorMessage } from "@/components/Loading";
import { useState } from "react";
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
        <div>
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
