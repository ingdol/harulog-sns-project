import { useQuery } from "@tanstack/react-query";
import { LIKE_STATUS_KEY } from "../key";
import { fetchLikeStatus } from "../api";
import { useAuthStore } from "@/stores/auth/useAuthStore";

export const useFetchLikeStatus = (feedId: number) => {
  const { user } = useAuthStore();
  const userId = user?.id;

  return useQuery({
    queryKey: [LIKE_STATUS_KEY, feedId, userId],
    queryFn: () => fetchLikeStatus(feedId, userId as string),
    enabled: !!feedId && !!userId,
  });
};
