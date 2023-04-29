import About from "./About";
import Friends from "./Friends";
import { Stack } from "@mui/material";
import { type RouterOutputs } from "@/utils/api";
type User = RouterOutputs["user"]["getOne"];
type UserProps = {
    userData: User;
};
export default function Info(props: UserProps) {
    const friends = props.userData?.friends;
    const description = props.userData?.description;
    return (
        <Stack
            direction='column'
            justifyContent='center'
            alignItems='center'
            spacing={3}>
            <About description={description} />
            <Friends friends={friends} />
        </Stack>
    );
}
