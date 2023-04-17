import { useSession } from "next-auth/react";
import { type Post } from "@prisma/client";
import { api } from "@/utils/api";
import { Button } from "@mui/material";
type PostsProps = {
    posts?: Post[];
};
const Posts = (props: PostsProps) => {
    //   const deletePost = api.post.deletePost.useMutation({
    //     onSuccess: () => {
    //       void refetchTopics();
    //     },
    //   });

    //   const deleteOne = (id: number) => {
    //     deletePost.mutate({
    //       id: id,
    //     });
    //   };
    return (
        <div>
            {props.posts?.map((post: Post) => {
                return <p>{post.title}</p>;
            })}
        </div>
    );
};
export default Posts;
