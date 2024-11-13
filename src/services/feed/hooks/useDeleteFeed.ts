import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FEED_KEY } from "../key";
import { deleteFeed } from "../api";
import { deleteFile } from "@/services/storage/api";

export const useDeleteFeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      feedId,
      imagePath,
    }: {
      feedId: number;
      imagePath: string;
    }) => {
      await deleteFeed(feedId);
      await deleteFile(imagePath);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FEED_KEY],
      });
    },
    onError: (error) => {
      console.error("삭제 중 오류가 발생했습니다:", error);
    },
  });
};
