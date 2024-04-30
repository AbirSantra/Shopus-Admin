"use client";

import { useModal } from "@/hooks/use-modal-store";
import { useEffect } from "react";

const SetupPage = () => {
  // const onOpen = useStoreModal((state) => state.onOpen);
  // const isOpen = useStoreModal((state) => state.isOpen);
  const { isOpen, onOpen } = useModal();

  useEffect(() => {
    if (!isOpen) {
      onOpen("CREATE_STORE");
    }
  }, [isOpen, onOpen]);

  return null;
};

export default SetupPage;
