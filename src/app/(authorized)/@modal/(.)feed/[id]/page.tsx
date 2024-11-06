import { FeedDetailCard } from "@/components/Cards/FeedCard";
import { InterceptingModal } from "@/components/Modals";

export default function FeedDetailModal() {
  return (
    <InterceptingModal type="feedDetail">
      <FeedDetailCard />
    </InterceptingModal>
  );
}
