"use client";

import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";

import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  // ensure none of the modals can be seen
  // or opened until the app is mounted
  // during server side rendering,
  // prevent hydration errors

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  );
};

export default ModalProvider;
