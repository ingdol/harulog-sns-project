import { FeedEditCard } from "@/components/pages/feed/FeedCard";
import { ModalPage } from "@/components/Modals";

export default function FeedEditPage() {
  return (
    <ModalPage type="feedDetail">
      <FeedEditCard />
    </ModalPage>
  );
}
