import { Paper, Typography } from "@mui/material";
import { type RouterOutputs } from "@/utils/api";
import { api } from "@/utils/api";
import FriendCard from "./FriendCard";
import { Loader, ErrorMessage } from "@/components/Loading";
type User = RouterOutputs["user"]["deleteOne"];
type UserProps = {
    friends: User[] | undefined;
    isLoading: boolean;
    isError: boolean;
    refetch: () => void;
};
export default function Friends(props: UserProps) {
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
        <div>
            <Typography variant='h4'>Friends</Typography>
            <Paper elevation={4} sx={{ borderRadius: "1.5em", mt: "0.5em" }}>
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
            </Paper>
        </div>
    );
}
