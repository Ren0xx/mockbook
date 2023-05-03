import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
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
const Header = () => {
    const { data: sessionData } = useSession();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    {/* <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton> */}
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ flexGrow: 1 }}>
                        <Link href='/'>Mockbook</Link>
                    </Typography>
                    {sessionData?.user && (
                        <>
                            <Button
                                color='inherit'
                                onClick={() => void signOut()}>
                                Logout
                            </Button>
                            <Avatar
                                alt='Profile picture'
                                src={
                                    sessionData?.user.image ?? "Profile picture"
                                }
                                component={Link}
                                href={`/profile/${sessionData?.user.id}`}
                            />
                            <IconButton
                                href='/settings'
                                aria-label='settings'
                                color='inherit'>
                                <SettingsIcon />
                            </IconButton>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};
export default Header;
