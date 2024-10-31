"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

function handleError(error: Error | null) {
  if (error) {
    console.error(error);
    throw error;
  }
}

const supabase = createClient();
const bucketName = process.env.NEXT_PUBLIC_STORAGE_BUCKET!;

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;

  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(file.name, file, {
      upsert: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

  handleError(error);

  return data;
}

export async function deleteFile(imagePath: string) {
  const { error } = await supabase.storage.from(bucketName).remove([imagePath]);
  if (error) throw error;
}
