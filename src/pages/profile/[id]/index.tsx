import { useSession } from "next-auth/react";
import SignIn from "@/components/SignIn";
const Profile: React.FC = () => {
    const { data: sessionData } = useSession();
    if (!sessionData) {
        return <SignIn />;
    }
    return <>User Profile</>;
};
export default Profile;
