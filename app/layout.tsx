import { Figtree } from "next/font/google";

import getSongsByUserId from "@/actions/getSongsByUserId";
// import getActiveProductsWithPrices from '@/actions/getActiveProductsWithPrices'
import Player from "@/components/Player";
import Sidebar from "@/components/Sidebar";
import ModalProvider from "@/providers/ModalProvider";
import SupabaseProvider from "@/providers/SupabaseProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import UserProvider from "@/providers/UserProvider";

import "./globals.css";

const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "soniDough",
  description: "Kneaded with ❤️ desde Miami🌴",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const products = await getActiveProductsWithPrices();
  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
