import { Container } from "@mui/material";
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Container maxWidth='lg'>
            <main>{children}</main>
        </Container>
    );
};
export default Layout;
