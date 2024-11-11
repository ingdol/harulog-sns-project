import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: { nickname: string } }
) {
  const supabase = createClient();

  console.log("GET /api/profile/[id] called with params:", params);

  try {
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("id, email, nickname, profile_image")
      .eq("nickname", params.nickname)
      .single();

    if (profileError || !profileData) {
      throw new Error("Profile not found");
    }

    const { data: feedData, error: feedError } = await supabase
      .from("feeds")
      .select("*")
      .is("deleted_at", null)
      .eq("user_id", profileData.id)
      .order("created_at", { ascending: false });

    if (feedError) {
      console.error("Failed to fetch feeds:", feedError);
      return NextResponse.json(
        { error: "피드 정보를 가져오는 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }
    return NextResponse.json({ info: profileData, feeds: feedData });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "데이터를 가져오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
