export async function addLike(feedId: number, userId: string) {
  const response = await fetch(`/api/like`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ feed_id: feedId, user_id: userId }),
  });
  if (!response.ok) {
    throw new Error("Failed to add like");
  }
  return response.json();
}

export async function removeLike(feedId: number, userId: string) {
  const response = await fetch(`/api/like?feedId=${feedId}&userId=${userId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to remove like");
  }
  return response.json();
}

export async function fetchLikeStatus(
  feedId: number,
  userId: string
): Promise<{ isLiked: boolean }> {
  const response = await fetch(
    `/api/like/status?feedId=${feedId}&userId=${userId}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch like status");
  }

  return response.json();
}
