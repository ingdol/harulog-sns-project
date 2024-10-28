"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

function handleError(error: Error | null) {
  if (error) {
    console.error(error);
    throw error;
  }
}

export async function uploadFile(formData: FormData) {
  const supabase = createClient();
  const file = formData.get("file") as File;

  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const bucketName = process.env.NEXT_PUBLIC_STORAGE_BUCKET!;

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
