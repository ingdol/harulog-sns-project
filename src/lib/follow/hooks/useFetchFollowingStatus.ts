import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { fetchFollowingStatus } from "../api";
import { FOLLOWING_STATUS_KEY } from "../key";

export const useFetchFollowingStatus = (followingId: string) => {
  const { user } = useAuthStore();
  const userId = user?.id;

  return useQuery({
    queryKey: [FOLLOWING_STATUS_KEY, userId],
    queryFn: () => fetchFollowingStatus(userId as string, followingId),
    enabled: !!userId && !!followingId,
  });
};
