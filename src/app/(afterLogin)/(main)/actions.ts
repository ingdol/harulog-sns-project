import { createClient } from "@/utils/supabase/server";
import { PaginatedFeedsDTO } from "@/services/feed/types";
import { getImageUrl } from "@/utils/supabase/storage";
import getBlurDataUrl from "@/utils/getBlurDataUrl";

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
  const feedsWithBlurData = await Promise.all(
    (data || []).map(async (feed) => {
      const { base64, img } = await getBlurDataUrl(
        getImageUrl(feed.feed_image)
      );
      return {
        ...feed,
        blurDataURL: base64,
        blurImg: img,
      };
    })
  );

  return {
    data: feedsWithBlurData,
    count: count || 0,
    page,
    pageSize,
    hasNextPage: count ? count > page * pageSize : false,
  };
}
