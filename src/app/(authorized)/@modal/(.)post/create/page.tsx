import PostCreateCard from "@/components/feed/PostCreateCard";
import InterceptingModal from "@/components/modal/InterceptingModal";

export default function PostCreateModal() {
  return (
    <InterceptingModal>
      <PostCreateCard />
    </InterceptingModal>
  );
}
