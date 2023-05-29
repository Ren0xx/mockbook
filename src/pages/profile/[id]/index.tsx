import { useSession } from "next-auth/react";
import SignIn from "@/components/SignIn";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import Head from "next/head";
import { ErrorMessage, PageLoader } from "@/components/Loading";
import { Avatar, Box, Typography, Container } from "@mui/material";
import UserPage from "@/components/UserPage/UserPage";
const Profile: React.FC = () => {
    const { data: sessionData } = useSession();
    const router = useRouter();
    const userId = router.query.id as string;

    const {
        data: user,
        isLoading,
        isError,
        refetch,
    } = api.user.getOne.useQuery(
        { id: userId },
        { enabled: sessionData?.user !== undefined }
    );

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
                {/* <Header /> */}
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
