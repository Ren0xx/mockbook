/* eslint-disable @typescript-eslint/no-misused-promises */
import { Box, Button, Typography, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import { Loader } from "@/components/Loading";
import { useState } from "react";
import Picture from "@/components/UserPage/ProfilePicture";
export default function Settings() {
    const { data: sessionData } = useSession();

    const [description, setDescription] = useState<string>("");
    const { isLoading, refetch, isRefetching } =
        api.user.getDescription.useQuery(undefined, {
            enabled: sessionData?.user !== undefined,
            onSuccess: (data) => {
                if (data !== undefined && data !== null)
                    setDescription(data.description);
            },
        });
    const update = api.user.updateDescription.useMutation({});
    const updateDescription = async () => {
        await update.mutateAsync({ description });
        void refetch();
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "2em",
                marginTop: "1.5em",
            }}>
            <Typography variant='h3'>Settings</Typography>
            <Typography variant='h4'>Profile picture</Typography>
            <Picture />
            <Typography variant='h4'>About me</Typography>
            {isLoading ? (
                <Loader />
            ) : (
                <TextField
                    id='outlined-multiline-static'
                    label='About me'
                    multiline
                    value={description}
                    rows={4}
                    onChange={handleChange}
                />
            )}

            <Button
                variant='contained'
                onClick={updateDescription}
                disabled={isRefetching || isLoading}>
                Update
            </Button>
        </Box>
    );
}
