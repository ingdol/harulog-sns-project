import {
  PaginatedFeedsDTO,
  IFeed,
  NewFeedDTO,
  UpdateFeedDTO,
} from "@/lib/feed/types";
import { FEED_PAGE_SIZE } from "@/constants";

interface FetchFeedsParams {
  page: number;
  pageSize?: number;
}

export async function fetchFeeds({
  page,
  pageSize = FEED_PAGE_SIZE,
}: FetchFeedsParams): Promise<PaginatedFeedsDTO> {
  const response = await fetch(`/api/feed?page=${page}&pageSize=${pageSize}`);
  if (!response.ok) {
    throw new Error("Failed to fetch feeds");
  }
  return response.json();
}

export async function fetchFeedById(feedId: string): Promise<IFeed> {
  const response = await fetch(`/api/feed/${feedId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch feed");
  }
  return response.json();
}

export async function createFeed(newFeed: NewFeedDTO): Promise<IFeed> {
  const response = await fetch("/api/feed", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newFeed),
  });
  if (!response.ok) {
    throw new Error("Failed to create feed");
  }
  return response.json();
}

export async function updateFeed(
  feedId: number,
  updateData: UpdateFeedDTO
): Promise<IFeed> {
  const response = await fetch(`/api/feed/${feedId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
  });
  if (!response.ok) {
    throw new Error("Failed to update feed");
  }
  return response.json();
}

export async function deleteFeed(feedId: number): Promise<void> {
  const response = await fetch(`/api/feed/${feedId}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error("Failed to delete feed");
  }
}
