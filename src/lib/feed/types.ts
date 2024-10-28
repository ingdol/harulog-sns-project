export interface IFeed {
  id: number;
  user_nickname: string;
  feed_image: string;
  feed_content: string;
  comment_count: number | 0;
  like_count: number | 0;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

export interface NewFeedDTO {
  id: number;
  user_nickname: string;
  feed_image: string;
  feed_content: string;
  comment_count: number | 0;
  like_count: number | 0;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}
