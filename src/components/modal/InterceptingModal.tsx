"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import styles from "./Modal.module.css";
import ModalBackButton from "./ModalBackButton";
import { useFeedStore } from "@/stores/feed/useFeedStore";

export default function InterceptingModal({
  type,
  children,
}: {
  type?: string;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const { imageFile } = useFeedStore();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({ top: 0 });
    }
  }, []);

  return (
    <div>
      <div
        className={styles.modalOverlay}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            router.back();
          }
        }}
      >
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
    </div>
  );
}
