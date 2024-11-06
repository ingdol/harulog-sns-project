import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const bucketName = process.env.NEXT_PUBLIC_STORAGE_BUCKET!;

export async function DELETE(request: Request) {
  const supabase = createClient();
  try {
    const { imagePath } = await request.json();
    if (!imagePath) {
      return NextResponse.json(
        { error: "No image path provided" },
        { status: 400 }
      );
    }

    const { error } = await supabase.storage
      .from(bucketName)
      .remove([imagePath]);

    if (error) throw error;

    return NextResponse.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Failed to delete file:", error);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const supabase = createClient();
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

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

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to upload file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
