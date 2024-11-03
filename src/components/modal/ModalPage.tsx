"use client";
import ModalBackButton from "./ModalBackButton";
import styles from "./Modal.module.css";
import { useFeedStore } from "@/stores/feed/useFeedStore";

export default function ModalPage({
  type,
  children,
}: {
  type?: string;
  children: React.ReactNode;
}) {
  const { imageFile } = useFeedStore();

  return (
    <div className={styles.modalOverlay}>
      <div
        className={`${styles.modalContent} ${
          type === "feedDetail"
            ? styles.feedDetail
            : imageFile
            ? "min-w-[70%] md:min-w-[60%] lg:min-w-[70%]"
            : "min-w-[70%] md:min-w-[50%] lg:min-w-[35%]"
        }
          }`}
      >
        <ModalBackButton />
        {children}
      </div>
    </div>
  );
}
