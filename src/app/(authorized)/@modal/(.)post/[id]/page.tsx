import PostDetailCard from "@/components/feed/PostDetailCard";
import InterceptingModal from "@/components/modal/InterceptingModal";

export default function PostDetailModal() {
  return (
    <InterceptingModal>
      <PostDetailCard />
    </InterceptingModal>
  );
}
