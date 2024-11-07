import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { COMMENT_PAGE_SIZE } from "@/constants";

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const { feed_id, user_id, comment_content } = await request.json();

    const { data, error } = await supabase
      .from("comments")
      .insert({
        feed_id,
        user_id,
        comment_content,
        created_at: new Date().toISOString(),
      })
      .select("*")
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to create comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const supabase = createClient();

  const { searchParams } = new URL(request.url);
  const feedId = parseInt(searchParams.get("feedId") || "1", 10);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(
    searchParams.get("pageSize") || COMMENT_PAGE_SIZE.toString(),
    10
  );

  try {
    const { data, count, error } = await supabase
      .from("comments_with_user_info")
      .select("*", { count: "exact" })
      .eq("feed_id", feedId)
      .order("created_at", { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (error) throw error;

    const hasNextPage = count ? count > page * pageSize : false;

    return NextResponse.json({
      data: data || [],
      count: count || 0,
      page,
      pageSize,
      hasNextPage,
    });
  } catch (error) {
    console.error("Failed to fetch feeds:", error);
    return NextResponse.json(
      { error: "Failed to fetch feeds" },
      { status: 500 }
    );
  }
}
