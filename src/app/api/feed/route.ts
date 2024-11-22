import { FEED_PAGE_SIZE } from "@/constants";
import { NewFeedDTO } from "@/services/feed";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = createClient();

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(
    searchParams.get("pageSize") || FEED_PAGE_SIZE.toString(),
    10
  );
  try {
    const { data, count, error } = await supabase
      .from("feeds_with_nickname")
      .select("*", { count: "exact" })
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (error) throw error;

    const hasNextPage = count ? count > page * pageSize : false;

    return NextResponse.json({
      data: data,
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

export async function POST(request: Request) {
  const supabase = createClient();
  try {
    const feed: NewFeedDTO = await request.json();
    const { data, error } = await supabase
      .from("feeds")
      .insert({
        ...feed,
        created_at: new Date().toISOString(),
      })
      .select("*")
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Failed to create feed:", error);
    return NextResponse.json(
      { error: "Failed to create feed" },
      { status: 500 }
    );
  }
}
