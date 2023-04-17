import { Container } from "@mui/material";
import styles from "@/styles/layout.module.css";
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Container maxWidth='lg'>
            <main>{children}</main>
        </Container>
    );
};
export default Layout;
