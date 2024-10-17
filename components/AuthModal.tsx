// "use client";

import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import useAuthModal from "@/hooks/useAuthModal";
import Modal from "./Modal";

interface AuthModalProps {
  showClose?: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({ showClose = true }) => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModal();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title="Welcome to sonidough" 
      description="Log in or Sign up to continue"
      isOpen={isOpen}
      onChange={onChange}
      showClose={showClose}
    >
      <Auth
        theme="dark"
        magicLink
        providers={["github"]}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: { brand: "#404040", brandAccent: "#244dd5" },
            },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
