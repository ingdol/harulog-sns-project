export interface IFeed {
  id: number;
  user_id: string;
  user_nickname: string;
  feed_image: string;
  feed_content: string;
  comment_count: number;
  like_count: number;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

export interface PaginatedFeedsDTO {
  data: IFeed[];
  count: number;
  page: number | null;
  pageSize: number | null;
  error?: Error;
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

export interface UpdateFeedDTO {
  feed_image?: string;
  feed_content?: string;
  updated_at?: string;
}

export interface img {
  src: string;
  height: number;
  width: number;
}
