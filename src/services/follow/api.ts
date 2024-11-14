export async function followUser(following_id: string) {
  const response = await fetch(`/api/follow`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ following_id }),
  });
  if (!response.ok) throw new Error("Failed to follow user");
  return response.json();
}

export async function unfollowUser(following_id: string) {
  const response = await fetch(`/api/follow?following_id=${following_id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to unfollow user");
  return response.json();
}

export async function fetchFollowing() {
  const response = await fetch("/api/following");
  if (!response.ok) throw new Error("Failed to fetch following list");
  return response.json();
}

export async function fetchFollowers() {
  const response = await fetch("/api/followers");
  if (!response.ok) throw new Error("Failed to fetch followers list");
  return response.json();
}

export async function fetchFollowingStatus(
  followingId: string
): Promise<{ isFollowing: boolean }> {
  const response = await fetch(
    `/api/follow/status?following_id=${followingId}`
  );

  if (!response.ok) {
    throw new Error("팔로우 상태를 가져오는 데 실패했습니다.");
  }

  return response.json();
}

export async function fetchFollowCounts(
  profileId: string
): Promise<{ followerCount: number; followingCount: number }> {
  const response = await fetch(`/api/follow/count?profile_id=${profileId}`);
  if (!response.ok) throw new Error("Failed to fetch follow counts");
  return response.json();
}
