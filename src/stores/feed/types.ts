export interface FeedStore {
  content: string;
  imageFile: File | null;
  imagePreview: string;
  setContent: (content: string) => void;
  setImageFile: (file: File) => void;
  loadFeedData: (feedId: number) => Promise<void>;
  resetForm: () => void;
}
