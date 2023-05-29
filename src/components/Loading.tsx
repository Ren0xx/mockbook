import { Backdrop, Box, CircularProgress } from "@mui/material";
const Loader = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: "0.7em",
            }}>
            <CircularProgress color='primary' />
        </Box>
    );
};
const ErrorMessage = () => {
    return <>Error while loading...</>;
};
const PageLoader = () => {
    return (
        <Backdrop open={true}>
            <CircularProgress color='primary' />
        </Backdrop>
    );
};
export { Loader, ErrorMessage, PageLoader };
