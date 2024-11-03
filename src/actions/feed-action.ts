"use server";

import {
  IFeed,
  NewFeedDTO,
  PaginatedFeedsDTO,
  UpdateFeedDTO,
} from "@/lib/feed/types";
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
    .is("deleted_at", null)
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

export async function fetchFeedById(feedId: string): Promise<IFeed | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("feeds_with_nickname")
    .select("*")
    .eq("id", feedId)
    .single();

  if (error) {
    handleError(error);
  }

  if (!data) {
    throw new Error(`Feed with id ${feedId} not found`);
  }

  return data as IFeed;
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

export async function updateFeed(
  feedId: string,
  updateFeedData: UpdateFeedDTO
) {
  const supabase = createClient();

  const dataToUpdate = {
    ...updateFeedData,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("feeds")
    .update(dataToUpdate)
    .eq("id", feedId)
    .select("*")
    .single();

  if (error) {
    console.error("Error updating feed:", error);
    throw error;
  }

  return data;
}

export async function deleteFeed(feedId: number) {
  const supabase = createClient();

  const { error } = await supabase
    .from("feeds")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", feedId);

  if (error) {
    handleError(error);
    return false;
  }

  return true;
}
