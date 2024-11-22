import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import sharp from "sharp";

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

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const webpImageBuffer = await sharp(buffer)
      .webp({ quality: 75 })
      .toBuffer();

    const fileNameWithoutExt = file.name.split(".").slice(0, -1).join(".");
    const webpFileName = `${fileNameWithoutExt}.webp`;

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(webpFileName, webpImageBuffer, {
        upsert: true,
        contentType: "image/webp",
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
