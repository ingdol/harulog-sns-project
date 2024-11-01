import { FeedCreateEditCard } from "@/components/feed/card";
import { ModalPage } from "@/components/modal";

export default function FeedEditPage() {
  return (
    <>
      <ModalPage>
        <FeedCreateEditCard />
      </ModalPage>
    </>
  );
}
