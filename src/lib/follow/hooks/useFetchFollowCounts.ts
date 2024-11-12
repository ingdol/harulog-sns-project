import { useQuery } from "@tanstack/react-query";
import { fetchFollowCounts } from "../api";
import { FOLLOW_COUNTS_KEY } from "../key";

export const useFetchFollowCounts = (profileId: string) => {
  return useQuery({
    queryKey: [FOLLOW_COUNTS_KEY, profileId],
    queryFn: () => fetchFollowCounts(profileId),
    enabled: !!profileId,
  });
};
