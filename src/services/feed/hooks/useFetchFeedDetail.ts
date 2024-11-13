import { useQuery } from "@tanstack/react-query";
import { FEED_DETAIL_KEY } from "../key";
import { fetchFeedById } from "../api";

export const useFetchFeedDetail = (id: number) => {
  return useQuery({
    queryKey: [FEED_DETAIL_KEY, id],
    queryFn: () => fetchFeedById(id),
    enabled: !!id,
  });
};
