import { COMMENT_PAGE_SIZE } from "@/constants";
import { IComment, NewCommentDTO, PaginatedCommentsDTO } from "./types";

export async function createComment(
  newComment: NewCommentDTO
): Promise<IComment> {
  const response = await fetch(`/api/comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  });
  if (!response.ok) throw new Error("Failed to create comment");
  return response.json();
}

interface FetchCommentsParams {
  feedId: string;
  page: number;
  pageSize?: number;
}

export async function fetchComments({
  feedId,
  page,
  pageSize = COMMENT_PAGE_SIZE,
}: FetchCommentsParams): Promise<PaginatedCommentsDTO> {
  const response = await fetch(
    `/api/comment?feedId=${feedId}&page=${page}&pageSize=${pageSize}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch comment");
  }
  return response.json();
}
