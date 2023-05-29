import { Typography, Paper, IconButton, Stack } from "@mui/material";
import styles from "@/styles/userpage/about.module.css";
import Link from "next/link";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
type AboutProps = {
    description: string | undefined;
    createdAt: Date | undefined;
    userId: string | undefined;
};
export default function About(props: AboutProps) {
    const { data: sessionData } = useSession();
    const { description, createdAt } = props;
    return (
        <Paper
            elevation={6}
            className={styles.container}
            component={Stack}
            direction='column'
            spacing={4}>
            <div className={styles.header}>
                <Typography variant='h4'>About me</Typography>
                {props.userId === sessionData?.user.id && (
                    <IconButton component={Link} href='/settings'>
                        <BorderColorIcon />
                    </IconButton>
                )}
            </div>
            <div>{description}</div>
            <hr />
            <div>
                <p>
                    Member since:{" "}
                    {format(createdAt || new Date(), "dd-MM-yyyy")}
                </p>
            </div>
        </Paper>
    );
}
