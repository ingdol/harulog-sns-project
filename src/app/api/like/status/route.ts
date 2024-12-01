import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const feedId = parseInt(searchParams.get("feedId") || "0", 10);

  try {
    const { data, error } = await supabase
      .from("likes")
      .select("id")
      .eq("feed_id", feedId)
      .single();

    if (error && error.code !== "PGRST116") throw error;

    const isLiked = !!data;
    return NextResponse.json({ isLiked });
  } catch (error) {
    console.error("Failed to check like status:", error);
    return NextResponse.json(
      { error: "Failed to check like status" },
      { status: 500 }
    );
  }
}
