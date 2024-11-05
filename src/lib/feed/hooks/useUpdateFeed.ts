import { updateFeed } from "@/actions/feed-action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FEED_KEY } from "../key";
import { IFeed, UpdateFeedDTO } from "../types";
import { deleteFile } from "@/actions/storage-action";

interface UpdateFeedParams {
  feedId: string;
  updateFeedData: UpdateFeedDTO;
  imageFile?: File | null;
  imagePreview: string;
}

export const useUpdateFeed = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<IFeed, Error, UpdateFeedParams>({
    mutationFn: async ({ feedId, updateFeedData }) => {
      return updateFeed(feedId, updateFeedData);
    },
    onSuccess: async (data, { imageFile, imagePreview }) => {
      console.log("feed 업데이트 성공");
      if (imageFile && imagePreview) {
        await deleteFile(imagePreview);
      }
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
