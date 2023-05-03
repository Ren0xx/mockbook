import About from "./About";
import Friends from "./Friends";
import { Stack } from "@mui/material";
import { type RouterOutputs } from "@/utils/api";
type User = RouterOutputs["user"]["getOne"];
type UserProps = {
    userData: User;
    isLoading: boolean;
    isError: boolean;
    refetch: () => void;
};
export default function Info(props: UserProps) {
    const friends = props.userData?.friends;
    const description = props.userData?.description;
    const { isLoading, isError, refetch } = props;
    return (
        <Stack
            direction='column'
            justifyContent='center'
            alignItems='center'
            spacing={3}>
            <About description={description} />
            <Friends
                friends={friends}
                isLoading={isLoading}
                isError={isError}
                refetch={refetch}
            />
        </Stack>
    );
}
