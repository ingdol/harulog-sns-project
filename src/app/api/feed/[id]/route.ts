import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { UpdateFeedDTO } from "@/lib/feed";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("feeds_with_nickname")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) throw error;
    if (!data) throw new Error(`Feed with id ${params.id} not found`);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch feed:", error);
    return NextResponse.json(
      { error: "Failed to fetch feed" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();
  try {
    const updateData: UpdateFeedDTO = await request.json();
    const { data, error } = await supabase
      .from("feeds")
      .update({
        ...updateData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select("*")
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to update feed:", error);
    return NextResponse.json(
      { error: "Failed to update feed" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();
  try {
    const { error } = await supabase
      .from("feeds")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", params.id);

    if (error) throw error;

    return NextResponse.json({ message: "Feed deleted successfully" });
  } catch (error) {
    console.error("Failed to delete feed:", error);
    return NextResponse.json(
      { error: "Failed to delete feed" },
      { status: 500 }
    );
  }
}
