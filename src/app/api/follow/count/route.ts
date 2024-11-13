import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const profileId = searchParams.get("profile_id");
  const supabase = createClient();

  if (!profileId) {
    return NextResponse.json(
      { error: "Profile ID is required" },
      { status: 400 }
    );
  }

  try {
    const { count: followerCount, error: followerError } = await supabase
      .from("follows")
      .select("id", { count: "exact" })
      .eq("following_id", profileId);

    if (followerError) throw followerError;

    const { count: followingCount, error: followingError } = await supabase
      .from("follows")
      .select("id", { count: "exact" })
      .eq("follower_id", profileId);

    if (followingError) throw followingError;

    return NextResponse.json({
      followerCount: followerCount || 0,
      followingCount: followingCount || 0,
    });
  } catch (error) {
    console.error("Failed to fetch follower/following counts:", error);
    return NextResponse.json(
      { error: "Failed to fetch counts" },
      { status: 500 }
    );
  }
}
