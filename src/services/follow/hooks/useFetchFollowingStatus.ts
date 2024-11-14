import { useQuery } from "@tanstack/react-query";
import { fetchFollowingStatus } from "../api";
import { FOLLOWING_STATUS_KEY } from "../key";

export const useFetchFollowingStatus = (followingId: string) => {
  return useQuery({
    queryKey: [FOLLOWING_STATUS_KEY],
    queryFn: () => fetchFollowingStatus(followingId),
    enabled: !!followingId,
  });
};
