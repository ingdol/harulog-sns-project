import { useQuery } from "@tanstack/react-query";
import { fetchFollowing } from "../api";
import { FOLLOWING_KEY } from "../key";

export const useFetchFollowing = () => {
  return useQuery({
    queryKey: [FOLLOWING_KEY],
    queryFn: () => fetchFollowing(),
  });
};
