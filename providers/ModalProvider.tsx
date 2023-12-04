"use client";

import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []); // ensure none of the modals can be seen
          // or opened until the app is mounted
          // during server side rendering

if (!isMounted) {
  return null
}

  return (
    <>
      Modals
    </>
  );
}

export default ModalProvider;