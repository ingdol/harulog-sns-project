import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../api";
import { COMMENT_KEY } from "../key";
import { FEED_KEY } from "@/services/feed";

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ commentId }: { commentId: number }) => {
      await deleteComment(commentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [COMMENT_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [FEED_KEY],
      });
    },
    onError: (error) => {
      console.error("삭제 중 오류가 발생했습니다:", error);
    },
  });
};
