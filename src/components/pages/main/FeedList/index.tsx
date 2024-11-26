"use client";

import { FEED_PAGE_SIZE } from "@/constants";
import { IFeed } from "@/services/feed";
import { useFetchFeeds } from "@/services/feed/hooks";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { CloudIcon } from "@heroicons/react/24/solid";
import { useCallback, useMemo, useRef } from "react";
import EmptyFeed from "../EmptyFeed";
import Feed from "../Feed";

export default function FeedList() {
  const { user } = useAuthStore();
  const observer = useRef<IntersectionObserver>();
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useFetchFeeds({ pageSize: FEED_PAGE_SIZE });

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  );

  const feedData = useMemo(() => {
    return (
      data?.pages.reduce((acc: IFeed[], page) => {
        return [...acc, ...page.data];
      }, []) || []
    );
  }, [data]);

  return (
    <div className="bg-white flex flex-col justify-center gap-5 pb-10">
      {isLoading && (
        <div className="mt-10 p-4 max-w-xl mx-auto flex flex-col justify-center items-center text-center gap-6">
          <CloudIcon className="w-8 h-8 text-slate-200" />
          <p className="text-xl text-gray-500">로딩 중</p>
        </div>
      )}

      {feedData?.length > 0 ? (
        feedData.map((feed: IFeed, index: number) => {
          const isLastElement = index === feedData.length - 1;
          return (
            <div key={feed.id} ref={isLastElement ? lastElementRef : undefined}>
              <Feed feed={feed} user={user || undefined} index={index} />
            </div>
          );
        })
      ) : (
        <EmptyFeed />
      )}
    </div>
  );
}
