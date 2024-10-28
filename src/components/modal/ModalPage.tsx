"use client";
import ModalBackButton from "./ModalBackButton";
import styles from "./Modal.module.css";

export default function ModalPage({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <ModalBackButton />
        {children}
      </div>
    </div>
  );
}
