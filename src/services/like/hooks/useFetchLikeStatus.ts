import { useQuery } from "@tanstack/react-query";
import { fetchLikeStatus } from "../api";
import { LIKE_STATUS_KEY } from "../key";

export const useFetchLikeStatus = (feedId: number) => {
  return useQuery({
    queryKey: [LIKE_STATUS_KEY, feedId],
    queryFn: () => fetchLikeStatus(feedId),
    enabled: !!feedId,
  });
};
