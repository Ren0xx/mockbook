import { User } from "@prisma/client";
import Link from "next/link";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import {
    Avatar,
    Card,
    CardContent,
    Typography,
    IconButton,
} from "@mui/material";
import { useState } from "react";
type FriendProps = {
    user: User;
    isFriend?: boolean;
    addFriend?: (id: string) => void;
    removeFriend?: (id: string) => void;
};
export default function FriendCard(props: FriendProps) {
    const { user, isFriend, addFriend, removeFriend } = props;
    const addOrRemoveFriend = () => {
        const { id } = user;
        isFriend ? removeFriend?.(id) : addFriend?.(id);
    };
    return (
        <Card sx={{ minWidth: 275 }} key={user.id}>
            <CardContent
                sx={{
                    display: "flex",
                    gap: "2em",
                    alignContent: "center",
                }}>
                <Avatar
                    sx={{ alignSelf: "center" }}
                    alt='Profile picture'
                    src={user.image ?? "Profile picture"}
                    component={Link}
                    href={`/profile/${user?.id}`}
                />
                <Link
                    style={{ alignSelf: "center" }}
                    href={`/profile/${user?.id}`}>
                    {user.name}
                </Link>
                <IconButton
                    sx={{ alignSelf: "center" }}
                    onClick={addOrRemoveFriend}>
                    {isFriend ? (
                        <PersonRemoveAlt1Icon />
                    ) : (
                        <PersonAddAlt1Icon />
                    )}
                </IconButton>
            </CardContent>
        </Card>
    );
}
