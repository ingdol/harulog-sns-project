"use server";

import { IFeed, NewFeedDTO } from "@/lib/feed/types";
import { createClient } from "@/utils/supabase/server";

function handleError(error: Error | null) {
  if (error) {
    console.error(error);
    throw error;
  }
}
export async function fetchFeeds() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("feeds_with_nickname")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    handleError(error);
  }
  return data;
}

export async function createFeed(feed: NewFeedDTO): Promise<IFeed> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("feeds")
    .insert({
      ...feed,
      created_at: new Date().toISOString(),
    })
    .select("*")
    .single();

  if (error) {
    handleError(error);
  }

  if (!data) {
    throw new Error("Failed to retrieve the inserted feed");
  }

  return data as IFeed;
}
