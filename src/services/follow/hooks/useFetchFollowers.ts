import { useQuery } from "@tanstack/react-query";
import { fetchFollowers } from "../api";
import { FOLLOWERS_KEY } from "../key";

export const useFetchFollowers = () => {
  return useQuery({
    queryKey: [FOLLOWERS_KEY],
    queryFn: () => fetchFollowers(),
  });
};
