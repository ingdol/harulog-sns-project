"use server";

import { NewFeedDTO } from "@/lib/feed/types";
import { createClient } from "@/utils/supabase/server";

function handleError(error: Error | null) {
  if (error) {
    console.error(error);
    throw error;
  }
}

export async function createFeed(feed: NewFeedDTO) {
  const supabase = createClient();

  const { data, error } = await supabase.from("feeds").insert({
    ...feed,
    created_at: new Date().toISOString(),
  });

  if (error) {
    handleError(error);
  }

  return data;
}
