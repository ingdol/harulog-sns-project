import { FeedCreateEditCard } from "@/components/feed/card";
import { InterceptingModal } from "@/components/modal";

export default function FeedCreateModal() {
  return (
    <InterceptingModal>
      <FeedCreateEditCard />
    </InterceptingModal>
  );
}
