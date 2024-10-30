import { createFeed } from "@/actions/feed-action";
import { useMutation } from "@tanstack/react-query";
import { IFeed, NewFeedDTO } from "../types";

export const useCreateFeed = () => {
  return useMutation<IFeed, Error, NewFeedDTO>({
    mutationFn: createFeed,
    onSuccess: () => {
      console.log("feed 생성 성공");
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });
};
