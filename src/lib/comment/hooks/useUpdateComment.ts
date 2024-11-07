import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComment } from "../api";
import { COMMENT_KEY } from "../key";
import { IComment } from "../types";

interface UpdateCommentParams {
  commentId: number;
  commentContent: string;
}

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation<IComment, Error, UpdateCommentParams>({
    mutationFn: async ({ commentId, commentContent }) => {
      return updateComment(commentId, commentContent);
    },
    onSuccess: async () => {
      console.log("comment 업데이트 성공");
      queryClient.invalidateQueries({
        queryKey: [COMMENT_KEY],
      });
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });
};
