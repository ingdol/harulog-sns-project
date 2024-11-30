"use client";

import { FEED_PAGE_SIZE } from "@/constants";
import { IFeed } from "@/services/feed";
import { useFetchFeeds } from "@/services/feed/hooks";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { CloudIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import EmptyFeed from "../EmptyFeed";
import Feed from "../Feed";

export default function FeedList() {
  const { user } = useAuthStore();
  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
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
      {isFetching && (
        <div className="mt-10 p-4 max-w-xl mx-auto flex flex-col justify-center items-center text-center gap-6">
          <CloudIcon className="w-8 h-8 text-slate-200" />
          <p className="text-xl text-gray-500">로딩 중</p>
        </div>
      )}

      {feedData.length > 0
        ? feedData.map((feed: IFeed, index: number) => (
            <Feed
              key={feed.id}
              feed={feed}
              user={user || undefined}
              index={index}
            />
          ))
        : !isFetching && <EmptyFeed />}
      <div ref={ref}></div>
    </div>
  );
}
