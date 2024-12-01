import { FeedList, FeedTopMenu } from "@/components/pages/main";
import { FEED_KEY } from "@/services/feed";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: [FEED_KEY],
    queryFn: async () => {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const res = await fetch(`${baseUrl}/api/feed`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch initial posts");
      return await res.json();
    },
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
