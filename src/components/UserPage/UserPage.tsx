import { Container, Grid } from "@mui/material";
import Info from "./Info";
import Feed from "./Feed";
import { type RouterOutputs } from "@/utils/api";
type User = RouterOutputs["user"]["getOne"];
type UserProps = {
    userData: User;
};
export default function UserPage(props: UserProps) {
    return (
        <Container maxWidth='lg'>
            <Grid container>
                <Grid item xs={4}>
                    <Info userData={props.userData} />
                </Grid>
                <Grid item xs={8}>
                    <Feed userId={props.userData?.id} />
                </Grid>
            </Grid>
        </Container>
    );
}
