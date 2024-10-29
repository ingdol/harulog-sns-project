import { addFeedAPI } from "@/actions/feed-action";
import { useMutation } from "@tanstack/react-query";
import { IFeed, NewFeedDTO } from "../types";

export const useAddFeed = () => {
  return useMutation<IFeed, Error, NewFeedDTO>({
    mutationFn: addFeedAPI,
    onSuccess: () => {
      console.log("feed 생성 성공");
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });
};
