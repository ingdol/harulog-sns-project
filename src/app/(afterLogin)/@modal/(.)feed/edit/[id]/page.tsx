import { FeedEditCard } from "@/components/pages/feed/FeedCard";
import { InterceptingModal } from "@/components/Modals";

export default function FeedEditModal() {
  return (
    <InterceptingModal>
      <FeedEditCard />
    </InterceptingModal>
  );
}
