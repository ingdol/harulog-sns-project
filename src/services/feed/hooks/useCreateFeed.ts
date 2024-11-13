import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IFeed, NewFeedDTO } from "../types";
import { FEED_KEY } from "../key";
import { useRouter } from "next/navigation";
import { createFeed } from "../api";

export const useCreateFeed = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<IFeed, Error, NewFeedDTO>({
    mutationFn: createFeed,
    onSuccess: () => {
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
