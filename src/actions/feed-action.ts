"use server";

import { IFeed, NewFeedDTO, PaginatedFeedsDTO } from "@/lib/feed/types";
import { createClient } from "@/utils/supabase/server";

function handleError(error: Error | null) {
  if (error) {
    console.error(error);
    throw error;
  }
}

interface FetchFeedsParams {
  page: number;
  pageSize: number;
}

export async function fetchFeeds({
  page,
  pageSize,
}: FetchFeedsParams): Promise<PaginatedFeedsDTO> {
  const supabase = createClient();

  const { data, count, error } = await supabase
    .from("feeds_with_nickname")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  const hasNextPage = count ? count > page * pageSize : false;
  if (error) {
    console.error(error);
    return {
      data: [],
      count: 0,
      page: null,
      pageSize: null,
      error,
      hasNextPage: false,
    };
  }

  return {
    data: data || [],
    count: count || 0,
    page,
    pageSize,
    hasNextPage,
  };
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
