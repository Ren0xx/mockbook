import { Container } from "@mui/material";
import styles from "@/styles/layout.module.css";
const Layout = ({ children }: { children: React.ReactNode }) => {
    return <Container maxWidth='lg'>{children}</Container>;
};
export default Layout;
