export async function followUser(follower_id: string, following_id: string) {
  const response = await fetch(`/api/follow`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ follower_id, following_id }),
  });
  if (!response.ok) throw new Error("Failed to follow user");
  return response.json();
}

export async function unfollowUser(follower_id: string, following_id: string) {
  const response = await fetch(
    `/api/follow?follower_id=${follower_id}&following_id=${following_id}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) throw new Error("Failed to unfollow user");
  return response.json();
}

export async function fetchFollowing(userId: string) {
  const response = await fetch(`/api/following?user_id=${userId}`);
  if (!response.ok) throw new Error("Failed to fetch following list");
  return response.json();
}

export async function fetchFollowers(userId: string) {
  const response = await fetch(`/api/followers?user_id=${userId}`);
  if (!response.ok) throw new Error("Failed to fetch followers list");
  return response.json();
}

export async function fetchFollowingStatus(
  followerId: string,
  followingId: string
): Promise<{ isFollowing: boolean }> {
  const response = await fetch(
    `/api/follow/status?follower_id=${followerId}&following_id=${followingId}`
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
