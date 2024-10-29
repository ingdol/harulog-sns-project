import { NewFeedDTO } from "@/lib/feed";

export const createNewFeed = (feed: NewFeedDTO, imageUrl: string) => {
  return {
    ...feed,
    feed_image: imageUrl,
    comment_count: 0,
    like_count: 0,
    created_at: new Date().toISOString(),
    updated_at: null,
    deleted_at: null,
  };
};
