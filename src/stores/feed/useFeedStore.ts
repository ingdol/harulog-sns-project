import { create } from "zustand";
import { FeedStore } from "./types";
import { fetchFeedById } from "@/lib/feed/api";

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
