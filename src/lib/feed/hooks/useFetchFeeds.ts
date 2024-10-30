import { fetchFeeds } from "@/actions/feed-action";
import { useQuery } from "@tanstack/react-query";

export const useFetchFeeds = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["feeds"],
    queryFn: () => fetchFeeds(),
  });
  return data;
};
