import { FeedCreateCard } from "@/components/Cards/FeedCard";
import { InterceptingModal } from "@/components/Modals";

export default function FeedCreateModal() {
  return (
    <InterceptingModal>
      <FeedCreateCard />
    </InterceptingModal>
  );
}
