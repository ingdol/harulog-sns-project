import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../api";
import { IComment, NewCommentDTO } from "../types";
import { COMMENT_KEY } from "../key";
import { FEED_KEY } from "@/services/feed";

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation<IComment, Error, NewCommentDTO>({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [COMMENT_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [FEED_KEY],
      });
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });
};
