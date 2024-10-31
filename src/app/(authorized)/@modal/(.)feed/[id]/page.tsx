import { FeedDetailCard } from "@/components/feed/card";
import { InterceptingModal } from "@/components/modal";

export default function FeedDetailModal() {
  return (
    <InterceptingModal>
      <FeedDetailCard />
    </InterceptingModal>
  );
}
