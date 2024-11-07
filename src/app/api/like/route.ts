import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = createClient();
  const { feed_id, user_id } = await request.json();

  try {
    const { error } = await supabase.from("likes").insert({ feed_id, user_id });

    if (error) throw error;

    return NextResponse.json({ message: "Like added successfully" });
  } catch (error) {
    console.error("Failed to add like:", error);
    return NextResponse.json({ error: "Failed to add like" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const feedId = parseInt(searchParams.get("feedId") || "0", 10);
  const userId = searchParams.get("userId") || "";

  try {
    const { error } = await supabase
      .from("likes")
      .delete()
      .match({ feed_id: feedId, user_id: userId });

    if (error) throw error;

    return NextResponse.json({ message: "Like removed successfully" });
  } catch (error) {
    console.error("Failed to remove like:", error);
    return NextResponse.json(
      { error: "Failed to remove like" },
      { status: 500 }
    );
  }
}
