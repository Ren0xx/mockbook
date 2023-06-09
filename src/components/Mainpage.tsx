import { Grid } from "@mui/material";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import styles from "@/styles/main.module.css";
import Posts from "./Posts";
import NewUsers from "./NewUsers";
import PostForm from "@/components/Forms/PostForm";
const MainPage: React.FC = () => {
    const { data: sessionData } = useSession();
    const {
        data: posts,
        refetch: refetchPosts,
        isLoading,
        isError,
    } = api.post.getAll.useQuery(undefined, {
        enabled: sessionData?.user !== undefined,
    });
    const refetch = () => void refetchPosts();
    return (
        <Grid container spacing={2} className={styles.grid}>
            <Grid item xs={12} md={8}>
                <PostForm refetchPosts={refetch} />
                <Posts
                    posts={posts}
                    refetchPosts={refetch}
                    isLoading={isLoading}
                    isError={isError}
                />
            </Grid>
            <Grid item xs={0} md={4}>
                <NewUsers />
            </Grid>
        </Grid>
    );
};
export default MainPage;
