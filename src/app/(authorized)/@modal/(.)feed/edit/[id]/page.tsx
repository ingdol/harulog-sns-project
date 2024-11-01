import { FeedCreateCard } from "@/components/feed/card";
import { InterceptingModal } from "@/components/modal";

export default function FeedEditModal() {
  return (
    <InterceptingModal>
      <FeedCreateCard />
    </InterceptingModal>
  );
}
