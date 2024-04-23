"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../ui/modal";

export const StoreModal = () => {
  const storeModal = useStoreModal();

  return (
    <Modal
      title="Create your store"
      description="Add a new store to start selling!"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Enter the name of your store
    </Modal>
  );
};
