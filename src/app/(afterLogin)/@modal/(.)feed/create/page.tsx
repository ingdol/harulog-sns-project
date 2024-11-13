import { FeedCreateCard } from "@/components/pages/feed/FeedCard";
import { InterceptingModal } from "@/components/Modals";

export default function FeedCreateModal() {
  return (
    <InterceptingModal>
      <FeedCreateCard />
    </InterceptingModal>
  );
}
