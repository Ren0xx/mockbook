import { Typography, Paper, IconButton, Stack } from "@mui/material";
import styles from "@/styles/userpage/about.module.css";
import Link from "next/link";
import BorderColorIcon from "@mui/icons-material/BorderColor";
type AboutProps = {
    description: string | undefined;
};
export default function About(props: AboutProps) {
    const { description } = props;
    return (
        <Paper
            elevation={6}
            className={styles.container}
            component={Stack}
            direction='column'
            spacing={4}>
            <div className={styles.header}>
                <Typography variant='h4'>About me</Typography>
                <IconButton component={Link} href='/settings'>
                    <BorderColorIcon />
                </IconButton>
            </div>
            <div>{description}</div>
            <div></div>
        </Paper>
    );
}
