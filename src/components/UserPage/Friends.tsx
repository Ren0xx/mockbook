import { Box, Typography } from "@mui/material";
import { type RouterOutputs } from "@/utils/api";
import { api } from "@/utils/api";
import FriendCard from "./FriendCard";
import { useSession } from "next-auth/react";
import { Loader, ErrorMessage } from "@/components/Loading";
type User = RouterOutputs["user"]["deleteOne"];
type UserProps = {
    friends: User[] | undefined;
    isLoading: boolean;
    isError: boolean;
    refetch: () => void;
};
export default function Friends(props: UserProps) {
    const { data: sessionData } = useSession();
    const { friends, isLoading, isError, refetch } = props;
    const removeFriend = api.user.removeFriend.useMutation({
        onSuccess: () => {
            void refetch();
        },
    });

    const removeOne = (id: string) => {
        removeFriend.mutate({ id });
    };
    if (isError) return <ErrorMessage />;
    if (isLoading) return <Loader />;
    return (
        <Box>
            <Typography variant='h4'>Friends</Typography>
            {friends && friends.length > 0 ? (
                friends.map((friend: User) => (
                    <FriendCard
                        key={friend.id}
                        user={friend}
                        isFriend={true}
                        removeFriend={removeOne}
                    />
                ))
            ) : (
                <p>No friends yet</p>
            )}
        </Box>
    );
}
