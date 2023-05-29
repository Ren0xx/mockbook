import IconButton from "@mui/material/IconButton";
import { signOut } from "next-auth/react";
import {
    AppBar,
    Avatar,
    Box,
    Toolbar,
    Typography,
    Button,
} from "@mui/material";
import Link from "next/link";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSession } from "next-auth/react";
import { Container } from "@mui/material";

const Header = () => {
    const { data: sessionData } = useSession();
    return (
        <AppBar position='static'>
            <Container sx={{ flexGrow: 1 }} maxWidth='lg'>
                <Toolbar>
                    
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ flexGrow: 1 }}>
                        <Link href='/'>Mockbook</Link>
                    </Typography>
                    {sessionData?.user && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 2,
                            }}>
                            <Avatar
                                alt='Profile picture'
                                src={
                                    sessionData?.user.image ?? "Profile picture"
                                }
                                component={Link}
                                href={`/profile/${sessionData?.user.id}`}
                            />
                            <Typography
                                component={Link}
                                sx={{
                                    "&:hover": {
                                        textDecoration: "underline #fff",
                                        textUnderlineOffset: "0.3em",
                                    },
                                }}
                                href={`/profile/${sessionData?.user.id}`}>
                                {sessionData?.user.name ?? "Anonymous"}
                            </Typography>
                            <Button
                                color='inherit'
                                onClick={() => void signOut()}>
                                Logout
                            </Button>

                            <IconButton
                                href='/settings'
                                aria-label='settings'
                                color='inherit'>
                                <SettingsIcon />
                            </IconButton>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;
