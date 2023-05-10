import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/env.mjs";
const supabaseUrl = "https://zwvmfwfemztceahztvat.supabase.co";
const anonKey = env.NEXT_PUBLIC_ANON_KEY;
const supabase = createClient(supabaseUrl, anonKey);
export function useFileUploader() {
    const [uploading, setUploading] = useState(false);

    const uploadFile = async (
        file: File,
        folderName: string,
        fileName: string
    ): Promise<string> => {
        try {
            setUploading(true);

            const { data, error } = await supabase.storage
                .from(folderName)
                .upload(fileName, file, { upsert: true });

            if (error) {
                console.error(error);
                throw error;
            }

            const publicUrl = supabase.storage
                .from(folderName)
                .getPublicUrl(data.path);

            return publicUrl.data.publicUrl;
        } finally {
            setUploading(false);
        }
    };

    return { uploading, uploadFile };
}
