import { useSession } from "next-auth/react";
import SignIn from "@/components/SignIn";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import Head from "next/head";
import { ErrorMessage, PageLoader } from "@/components/Loading";
import { Avatar, Box, Button, Typography, Container } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";

import UserPage from "@/components/UserPage/UserPage";
import { useState } from "react";

const Profile: React.FC = () => {
    const { data: sessionData } = useSession();
    const router = useRouter();
    const userId = router.query.id as string;
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const {
        data: user,
        isLoading,
        isError,
        refetch,
    } = api.user.getOne.useQuery(
        { id: userId },
        { enabled: sessionData?.user !== undefined }
    );
    const { data: loggedUser, refetch: refetchLoggedUser, isRefetching } =
        api.user.getLoggedUser.useQuery(undefined, {
            enabled: sessionData?.user !== undefined,
        });

    const isFriend = loggedUser?.friends.some((friend) => friend.id === userId);
    //adding or removing user from friends
    const addFriend = api.user.addFriend.useMutation({
        onSuccess: () => {
            void refetchLoggedUser();
            setIsDisabled(false);
        },
    });
    const removeFriend = api.user.removeFriend.useMutation({
        onSuccess: () => {
            void refetchLoggedUser();
            setIsDisabled(false);
        },
    });

    const addOne = async (id: string) => {
        setIsDisabled(true);
        await addFriend.mutateAsync({ id });
    };
    const removeOne = async (id: string) => {
        setIsDisabled(true);
        await removeFriend.mutateAsync({ id });
    };

    const addOrRemoveFriend = () => {
        void (isFriend ? removeOne(userId) : addOne(userId));
    };

    if (!sessionData) {
        return <SignIn />;
    }
    if (isError) return <ErrorMessage />;
    if (isLoading) return <PageLoader />;

    const refetchUser = () => void refetch();
    return (
        <>
            <Head>
                <title>{user?.name || "Annonymous"} - Mockbook</title>
            </Head>
            <Container maxWidth='lg'>
                <Box
                    sx={{
                        p: "1.6em",
                        display: "flex",
                        gap: 3.5,
                        alignItems: "center",
                    }}>
                    <Avatar
                        sx={{ width: 80, height: 80 }}
                        alt='Profile picture'
                        src={user?.image ?? "Profile picture"}
                    />
                    <Typography variant='h4'>
                        {user?.name ?? "Annoymous"}
                    </Typography>
                    {userId !== sessionData.user.id ? (
                        <Button
                            disabled={isDisabled || isRefetching}
                            startIcon={
                                isFriend ? (
                                    <PersonRemoveAlt1Icon />
                                ) : (
                                    <PersonAddAlt1Icon />
                                )
                            }
                            variant='contained'
                            sx={{ borderRadius: 6, ml: "auto" }}
                            onClick={addOrRemoveFriend}>
                            {isFriend ? "Remove Friend" : "Add Friend"}
                        </Button>
                    ) : null}
                </Box>
                <UserPage
                    userData={user}
                    isLoading={isLoading}
                    isError={isError}
                    refetch={refetchUser}
                />
            </Container>
        </>
    );
};
export default Profile;
