"use client";

import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import useAuthModal from "@/hooks/useAuthModal";
import AuthModal from "@/components/AuthModal";

interface AuthenticatedContentProps {
  children: React.ReactNode;
}

const AuthenticatedContent: React.FC<AuthenticatedContentProps> = ({ children }) => {
  const { session, isLoading } = useSessionContext();
  const { onOpen } = useAuthModal();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading && !session && isMounted) {
      onOpen();
    }
  }, [session, isLoading, isMounted, onOpen]);

  if (!isMounted || isLoading) {
    return null;
  }

  if (!session) {
    return (
      <div className="h-full flex items-center justify-center">
        <AuthModal showClose={false} />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthenticatedContent;
