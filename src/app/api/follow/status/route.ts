import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const followingId = searchParams.get("following_id");

  if (!followingId) {
    return NextResponse.json(
      { error: "follower_id와 following_id가 필요합니다." },
      { status: 400 }
    );
  }

  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("follows")
      .select("id")
      .eq("following_id", followingId);

    if (error) throw error;

    const isFollowing = data && data.length > 0;
    return NextResponse.json({ isFollowing });
  } catch (error) {
    console.error("Failed to check following status:", error);
    return NextResponse.json(
      { error: "팔로우 상태를 확인하는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
