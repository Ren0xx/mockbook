import { useSession } from "next-auth/react";
import SignIn from "@/components/SignIn";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { Loader, ErrorMessage } from "@/components/Loading";
import { type RouterOutputs } from "@/utils/api";
import { Typography, Container } from "@mui/material";
import Header from "@/components/UserPage/Header";
import UserPage from "@/components/UserPage/UserPage";
type User = RouterOutputs["user"]["getOne"];
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
    if (isLoading) return <Loader />;
    return (
        <Container maxWidth='lg'>
            <Header />
            <Typography>User name: {user?.name ?? "No name"}</Typography>
            <UserPage userData={user} isLoading={isLoading} isError={isError} refetch={refetch} />
        </Container>
    );
};
export default Profile;
