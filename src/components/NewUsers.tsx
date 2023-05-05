import {
    Box,
    Typography,
} from "@mui/material";
import { type RouterOutputs } from "@/utils/api";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import FriendCard from "@/components/UserPage/FriendCard";
type User = RouterOutputs["user"]["getNewest"][0];
import { Loader, ErrorMessage } from "@/components/Loading";
export default function NewUsers() {
    const { data: sessionData } = useSession();
    const {
        data: users,
        isLoading,
        isError,
        refetch,
    } = api.user.getNewest.useQuery(undefined, {
        enabled: sessionData?.user !== undefined,
    });
    const addFriend = api.user.addFriend.useMutation({
        onSuccess: () => {
            void refetch();
        },
    });
    // const removeFriend = api.user.removeFriend.useMutation({
    //     onSuccess: () => {
    //         void refetch();
    //     },
    // });

    const addOne = (id: string) => {
        addFriend.mutate({ id });
    };
    // const removeOne = (id: string) => {
    //     removeFriend.mutate({ id });
    // };
    if (isError) return <ErrorMessage />;
    if (isLoading) return <Loader />;
    return (
        <Box>
            <Typography variant='h4'>New users</Typography>
            {users?.map((user: User) => (
                //we are only getting users that are not user's friends
                <FriendCard
                    key={user.id}
                    user={user}
                    isFriend={false}
                    addFriend={addOne}
                />
            ))}
        </Box>
    );
}
