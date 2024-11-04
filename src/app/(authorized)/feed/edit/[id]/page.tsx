import { FeedEditCard } from "@/components/feed/card";
import { ModalPage } from "@/components/modal";

export default function FeedEditPage() {
  return (
    <ModalPage type="feedDetail">
      <FeedEditCard />
    </ModalPage>
  );
}
