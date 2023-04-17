import { useSession } from "next-auth/react";
import { type Post } from "@prisma/client";
import { api } from "@/utils/api";
import { Button } from "@mui/material";
const Posts: React.FC = () => {
    const { data: sessionData } = useSession();
    const { data: posts, refetch: refetchPosts } = api.post.getAll.useQuery(
        undefined,
        {
            enabled: sessionData?.user !== undefined,
        }
    );

    const createPost = api.post.create.useMutation({
        onSuccess: () => {
            void refetchPosts();
        },
    });
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
    const createOne = (title: string, content: string) => {
        createPost.mutate({
            title: title,
            content: content,
        });
    };
    return (
        <div>
            {posts?.map((post: Post) => {
                return <p>{post.title}</p>;
            })}
            <Button onClick={() => createOne("Title", "Content")}>
                Add Post
            </Button>
        </div>
    );
};
export default Posts;
