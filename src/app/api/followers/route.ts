import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id");
  const supabase = createClient();

  const { data, error } = await supabase
    .from("follows")
    .select("follower_id, profiles:profiles(nickname, profile_image)")
    .eq("following_id", user_id);

  if (error) {
    console.error("Failed to fetch followers list:", error);
    return NextResponse.json(
      { error: "팔로워 목록 조회에 실패했습니다." },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
