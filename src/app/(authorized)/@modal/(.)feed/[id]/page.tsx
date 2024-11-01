import { FeedDetailCard } from "@/components/feed/card";
import { InterceptingModal } from "@/components/modal";

export default function FeedDetailModal() {
  return (
    <InterceptingModal type="feedDetail">
      <FeedDetailCard />
    </InterceptingModal>
  );
}
