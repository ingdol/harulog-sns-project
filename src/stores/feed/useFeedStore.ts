import { create } from "zustand";
import { fetchFeedById } from "@/actions/feed-action";
import { FeedStore } from "./types";

export const useFeedStore = create<FeedStore>((set) => ({
  content: "",
  imageFile: null,
  imagePreview: "",

  setContent: (content) => set({ content }),
  setImageFile: (file) =>
    set({
      imageFile: file,
    }),
  loadFeedData: async (feedId) => {
    const feed = await fetchFeedById(feedId);
    if (feed) {
      set({
        content: feed.feed_content,
        imagePreview: feed.feed_image || "",
        imageFile: null,
      });
    }
  },
  resetForm: () =>
    set({
      content: "",
      imageFile: null,
      imagePreview: "",
    }),
}));
