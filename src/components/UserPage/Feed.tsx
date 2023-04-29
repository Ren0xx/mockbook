import { type RouterOutputs } from "@/utils/api";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Posts from "@/components/Posts";
import PostForm from "@/components/Forms/PostForm";
type Post = RouterOutputs["post"]["getAll"][0];
type UserProps = {
    userId: string | undefined;
};
export default function Feed(props: UserProps) {
    const { data: sessionData } = useSession();
    const {
        data: userPosts,
        isLoading,
        isError,
        refetch,
    } = api.post.allOfUser.useQuery(
        { id: props.userId || "" },
        { enabled: sessionData?.user !== undefined }
    );

    return (
        <div>
            <h1>Feed</h1>
            {props.userId === sessionData?.user.id && (
                <PostForm refetchPosts={refetch} />
            )}
            <Posts
                posts={userPosts}
                isLoading={isLoading}
                isError={isError}
                refetchPosts={refetch}
            />
        </div>
    );
}
