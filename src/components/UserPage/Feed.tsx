import { type RouterOutputs } from "@/utils/api";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Posts from "@/components/Posts";
import PostForm from "@/components/Forms/PostForm";
type Post = RouterOutputs["post"]["getAll"];
type UserProps = {
    userId: string | undefined;
    posts: Post | undefined;
    isLoading: boolean;
    isError: boolean;
    refetch: () => void;
};
export default function Feed(props: UserProps) {
    const { data: sessionData } = useSession();
    const { posts, isLoading, isError, refetch } = props;
    const refetchUser = () => {
        void refetch();
    };
    return (
        <div>
            <h1>Feed</h1>
            {props.userId === sessionData?.user.id && (
                <PostForm refetchPosts={refetchUser} />
            )}
            <Posts
                posts={posts}
                isLoading={isLoading}
                isError={isError}
                refetchPosts={refetch}
            />
        </div>
    );
}
