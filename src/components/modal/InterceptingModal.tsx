"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import styles from "./Modal.module.css";
import ModalBackButton from "./ModalBackButton";

export default function InterceptingModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({ top: 0 });
    }
  }, []);

  return (
    <div className="modalContainer">
      <div
        className={styles.modalOverlay}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            router.back();
          }
        }}
      >
        <div className={styles.modalContent}>
          <ModalBackButton />
          {children}
        </div>
      </div>
    </div>
  );
}
