import { FeedCreateEditCard } from "@/components/feed/card";
import { InterceptingModal } from "@/components/modal";

export default function FeedEditModal() {
  return (
    <InterceptingModal>
      <FeedCreateEditCard />
    </InterceptingModal>
  );
}
