import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = createClient();
  const { follower_id, following_id } = await request.json();

  const { data, error } = await supabase
    .from("follows")
    .insert({ follower_id, following_id });

  if (error) {
    console.error("Failed to follow:", error);
    return NextResponse.json(
      { error: "팔로우에 실패했습니다." },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const follower_id = searchParams.get("follower_id");
  const following_id = searchParams.get("following_id");

  if (!follower_id || !following_id) {
    return NextResponse.json(
      { error: "필수 파라미터가 누락되었습니다." },
      { status: 400 }
    );
  }

  const supabase = createClient();

  const { error } = await supabase
    .from("follows")
    .delete()
    .eq("follower_id", follower_id)
    .eq("following_id", following_id);

  if (error) {
    console.error("Failed to unfollow:", error);
    return NextResponse.json(
      { error: "언팔로우에 실패했습니다." },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "언팔로우 성공" });
}
