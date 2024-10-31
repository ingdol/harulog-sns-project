import { deleteFeed } from "@/actions/feed-action";
import { deleteFile } from "@/actions/storage-action";
import { queryClient } from "@/providers/TanstackQueryClientProvider";
import { useMutation } from "@tanstack/react-query";
import { FEED_KEY } from "../key";

export const useDeleteFeed = () => {
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
      console.log("게시글과 이미지가 삭제되었습니다.");
      queryClient.invalidateQueries({
        queryKey: [FEED_KEY],
      });
    },
    onError: (error) => {
      console.error("삭제 중 오류가 발생했습니다:", error);
    },
  });
};
