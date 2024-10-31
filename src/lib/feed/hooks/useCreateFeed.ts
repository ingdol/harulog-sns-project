import { createFeed } from "@/actions/feed-action";
import { useMutation } from "@tanstack/react-query";
import { IFeed, NewFeedDTO } from "../types";
import { queryClient } from "@/providers/TanstackQueryClientProvider";
import { FEED_KEY } from "../key";
import { useRouter } from "next/navigation";

export const useCreateFeed = () => {
  const router = useRouter();

  return useMutation<IFeed, Error, NewFeedDTO>({
    mutationFn: createFeed,
    onSuccess: () => {
      console.log("feed 생성 성공");
      queryClient.invalidateQueries({
        queryKey: [FEED_KEY],
      });
      router.back();
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });
};
