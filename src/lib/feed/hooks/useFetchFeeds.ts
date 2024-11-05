import { fetchFeeds } from "@/actions/feed-action";
import { FEED_PAGE_SIZE } from "@/constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FEED_KEY } from "../key";
import { PaginatedFeedsDTO } from "../types";

interface UseFeedsQueryOptions {
  pageSize?: number;
}
export const useFetchFeeds = ({
  pageSize = FEED_PAGE_SIZE,
}: UseFeedsQueryOptions) => {
  return useInfiniteQuery<PaginatedFeedsDTO, Error>({
    initialPageParam: 1,
    queryKey: [FEED_KEY],
    queryFn: ({ pageParam }) =>
      fetchFeeds({ page: pageParam as number, pageSize }),
    getNextPageParam: (lastPage) => (lastPage.page ? lastPage.page + 1 : null),
  });
};
