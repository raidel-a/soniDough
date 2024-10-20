import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import getSongs from "@/actions/getSongs";
import PageContent from "./components/PageContent";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthenticatedContent from "./components/AuthenticatedContent";

export const revalidate = 0;

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  const songs = await getSongs();

  return (
    <AuthenticatedContent>
      <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
        <Header>
          <div className="mb-2">
            <h1 className="text-white text-3xl font-semibold">
              Welcome {session?.user?.email}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
              <ListItem 
                image="/images/liked.png"
                name="Liked Songs"
                href="liked"
              />
            </div>
          </div>
        </Header>
        <div className="mt-2 mb-7 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-2xl font-semibold">Newest songs</h1>
          </div>
          <PageContent songs={songs} />
        </div>
      </div>
    </AuthenticatedContent>
  );
}
