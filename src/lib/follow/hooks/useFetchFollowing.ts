import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { fetchFollowing } from "../api";
import { FOLLOWING_KEY } from "../key";

export const useFetchFollowing = () => {
  const { user } = useAuthStore();
  const userId = user?.id;

  return useQuery({
    queryKey: [FOLLOWING_KEY, userId],
    queryFn: () => fetchFollowing(userId as string),
    enabled: !!userId,
  });
};
