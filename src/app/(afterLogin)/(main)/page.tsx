import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { FEED_PAGE_SIZE } from "@/constants";
import { fetchFeedsDirect } from "./actions";
import { FEED_KEY } from "@/services/feed";
import { FeedList, FeedTopMenu } from "@/components/pages/main";

export default async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: [FEED_KEY],
    queryFn: ({ pageParam }) =>
      fetchFeedsDirect({ page: pageParam as number, pageSize: FEED_PAGE_SIZE }),
    initialPageParam: 1,
    staleTime: 60 * 1000,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <div>
      <FeedTopMenu />
      <HydrationBoundary state={dehydratedState}>
        <FeedList />
      </HydrationBoundary>
    </div>
  );
}
