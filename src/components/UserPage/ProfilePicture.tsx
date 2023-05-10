import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Avatar,
    Box,
    Button,
    Typography,
    TextField,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { api } from "@/utils/api";
import { useFileUploader } from "@/utils/useFileUploader";
export default function Picture() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);

    const { data: sessionData } = useSession();
    const update = api.user.updateProfilePicture.useMutation({});

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setFile(file || null);
    };
    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };
    //file uploader
    const { uploading, uploadFile } = useFileUploader();
    const submit = async () => {
        if (!file) return;
        const folderName = `profilePictures/${sessionData?.user.id}`;
        const fileName = "profPicture";

        try {
            const path = await uploadFile(file, folderName, fileName);
            setFile(null);
            update.mutateAsync({
                urlPath: path,
            });
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'>
                    <Avatar
                        alt='Profile picture'
                        sx={{ width: 60, height: 60 }}
                        src={sessionData?.user.image ?? "Profile picture"}
                    />
                    <Typography>Change profile picture</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form>
                        <input
                            type='file'
                            ref={fileInputRef}
                            hidden
                            onChange={handleFileChange}
                            accept='image/png, image/jpeg, image/jpg'
                        />
                        <Button variant='contained' onClick={handleButtonClick}>
                            Choose File
                        </Button>
                        <p>Selected file: {file?.name}</p>
                        <Button
                            variant='contained'
                            onClick={submit}
                            disabled={!file || uploading}>
                            Submit
                        </Button>
                    </form>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
