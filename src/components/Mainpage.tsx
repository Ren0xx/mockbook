import { Grid } from "@mui/material";
import styles from "@/styles/main.module.css";
import Posts from "./Posts";
const MainPage: React.FC = () => {
    return (
        <Grid container spacing={2} className={styles.grid}>
            <Grid item xs={8} md={8}>
                <p>Feed </p>
                <Posts />
            </Grid>
            <Grid item xs={4}>
                <p>User friends(active) </p>
            </Grid>
        </Grid>
    );
};
export default MainPage;
