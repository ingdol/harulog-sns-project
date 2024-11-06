import { createClient } from "@/utils/supabase/server";
import { PaginatedFeedsDTO } from "@/lib/feed/types";

interface FetchFeedsParams {
  page: number;
  pageSize: number;
}

export async function fetchFeedsDirect({
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

  if (error) {
    throw new Error(`Failed to fetch feeds: ${error.message}`);
  }

  return {
    data: data || [],
    count: count || 0,
    page,
    pageSize,
    hasNextPage: count ? count > page * pageSize : false,
  };
}
