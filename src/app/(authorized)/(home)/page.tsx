import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchFeeds } from "@/actions/feed-action";
import { FEED_KEY } from "@/lib/feed/key";
import { FEED_PAGE_SIZE } from "@/constants";
import { FeedList, FeedTopMenu } from "@/components/Feeds";

export default async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: [FEED_KEY],
    queryFn: ({ pageParam }) =>
      fetchFeeds({ page: pageParam as number, pageSize: FEED_PAGE_SIZE }),
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
