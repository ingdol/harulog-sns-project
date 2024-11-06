import { FeedEditCard } from "@/components/Cards/FeedCard";
import { InterceptingModal } from "@/components/Modals";

export default function FeedEditModal() {
  return (
    <InterceptingModal>
      <FeedEditCard />
    </InterceptingModal>
  );
}
