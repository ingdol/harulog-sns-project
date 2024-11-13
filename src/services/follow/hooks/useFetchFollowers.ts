import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { fetchFollowers } from "../api";
import { FOLLOWERS_KEY } from "../key";

export const useFetchFollowers = () => {
  const { user } = useAuthStore();
  const userId = user?.id;

  return useQuery({
    queryKey: [FOLLOWERS_KEY, userId],
    queryFn: () => fetchFollowers(userId as string),
    enabled: !!userId,
  });
};
