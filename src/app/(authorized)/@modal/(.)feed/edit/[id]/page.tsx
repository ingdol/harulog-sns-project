import { FeedEditCard } from "@/components/feed/card";
import { InterceptingModal } from "@/components/modal";

export default function FeedEditModal() {
  return (
    <InterceptingModal>
      <FeedEditCard />
    </InterceptingModal>
  );
}
