import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../api";
import { PROFILE_KEY } from "../key";

export function useUserProfile(nickname: string) {
  return useQuery({
    queryKey: [PROFILE_KEY, nickname],
    queryFn: () => fetchUserProfile(nickname),
    enabled: !!nickname,
  });
}
