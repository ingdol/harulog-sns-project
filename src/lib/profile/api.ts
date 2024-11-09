export async function fetchUserProfile(nickname: string) {
  const response = await fetch(`/api/profile/${nickname}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }
  return response.json();
}
