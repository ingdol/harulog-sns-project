export interface IFeed {
  id: number;
  user_id: string;
  feed_image: string;
  feed_content: string;
  comment_count: number;
  like_count: number;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

export interface NewFeedDTO {
  user_id: string;
  feed_image: string;
  feed_content: string;
  // comment_count: number;
  // like_count: number;
  // created_at: string;
  // updated_at: string | null;
  // deleted_at: string | null;
}
