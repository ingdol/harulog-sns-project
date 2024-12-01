"use client";

import { FEED_PAGE_SIZE } from "@/constants";
import { IFeed } from "@/services/feed";
import { useFetchFeeds } from "@/services/feed/hooks";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import EmptyFeed from "../EmptyFeed";
import Feed from "../Feed";
import FeedLoading from "../FeedLoading";

export default function FeedList() {
  const { user } = useAuthStore();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchFeeds({
      pageSize: FEED_PAGE_SIZE,
    });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const feedData = data?.pages?.flatMap((page) => page.data) || [];

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return (
    <div className="bg-white flex flex-col justify-center gap-5 pb-10">
      {feedData.length > 0 ? (
        feedData.map((feed: IFeed, index: number) => (
          <Feed
            key={feed.id}
            feed={feed}
            user={user || undefined}
            index={index}
          />
        ))
      ) : (
        <EmptyFeed />
      )}
      {isFetchingNextPage ? <FeedLoading /> : <div ref={ref} />}
    </div>
  );
}
