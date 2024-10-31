import { fetchFeedById } from "@/actions/feed-action";
import { useQuery } from "@tanstack/react-query";
import { FEED_DETAIL_KEY } from "../key";

export const useFetchFeedDetail = (id: string) => {
  return useQuery({
    queryKey: [FEED_DETAIL_KEY, id],
    queryFn: () => fetchFeedById(id),
    enabled: !!id,
  });
};
