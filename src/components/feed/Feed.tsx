"use client";

import { fetchFeeds } from "@/actions/feed-action";
import { IFeed } from "@/lib/feed";
import { useQuery } from "@tanstack/react-query";
import EmptyFeed from "./EmptyFeed";
import Post from "./Post";

const Feed = () => {
  const { data } = useQuery({
    queryKey: ["feeds"],
    queryFn: () => fetchFeeds(),
  });

  if (data) {
    console.log(data);
  }
  return (
    <div className="bg-white flex flex-col justify-center gap-5 pb-10">
      {data?.length ? (
        data.map((post: IFeed) => <Post key={post.id} post={post} />)
      ) : (
        <EmptyFeed />
      )}
    </div>
  );
};

export default Feed;
