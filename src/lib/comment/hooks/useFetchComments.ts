import { COMMENT_PAGE_SIZE } from "@/constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchComments } from "../api";
import { COMMENT_KEY } from "../key";
import { PaginatedCommentsDTO } from "../types";

interface UseCommentsQueryOptions {
  feedId: string;
  pageSize?: number;
}
export const useFetchComments = ({
  feedId,
  pageSize = COMMENT_PAGE_SIZE,
}: UseCommentsQueryOptions) => {
  return useInfiniteQuery<PaginatedCommentsDTO, Error>({
    initialPageParam: 1,
    queryKey: [COMMENT_KEY],
    queryFn: ({ pageParam }) =>
      fetchComments({ feedId, page: pageParam as number, pageSize }),
    getNextPageParam: (lastPage) => (lastPage.page ? lastPage.page + 1 : null),
  });
};
