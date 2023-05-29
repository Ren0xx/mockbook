import { api } from "./api";
import { useState } from "react";

const useLike = (
    postId: string,
    isLiked: boolean,
    refetchPosts: () => void,
    likeId?: string
) => {
    const [liked, setLiked] = useState(isLiked);
    const [isDisabled, setIsDisabled] = useState(false);

    const createLike = api.like.add.useMutation({});
    const deleteLike = api.like.remove.useMutation({});

    async function likeOrDislike() {
        try {
            if (!isDisabled) {
                setIsDisabled(true);
                if (!isLiked) {
                    await createLike.mutateAsync({
                        postId,
                    });
                    setLiked(true);
                } else {
                    if (likeId !== undefined) {
                        await deleteLike.mutateAsync({
                            likeId,
                        });
                        setLiked(false);
                    }
                }
                void refetchPosts();
                setTimeout(() => {
                    setIsDisabled(false);
                }, 1500);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return { liked, likeOrDislike, isDisabled };
};

export default useLike;
