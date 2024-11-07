export interface IComment {
  id: number;
  feed_id: string;
  user_id: string;
  user_nickname: string;
  user_profile_image: string;
  comment_content: string;
  created_at: string;
  updated_at: string | null;
}

export interface PaginatedCommentsDTO {
  data: IComment[];
  count: number;
  page: number | null;
  pageSize: number | null;
  hasNextPage: boolean;
  error?: Error;
}
export interface NewCommentDTO {
  feed_id: string;
  user_id: string;
  comment_content: string;
}

export interface UpdateCommentDTO {
  comment_id?: number;
  comment_content?: string;
  updated_at?: string;
}
