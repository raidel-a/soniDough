import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import getSongs from "@/actions/getSongs";
import PageContent from "./components/PageContent";
import { getServerSession } from "next-auth/next";

export const revalidate = 0;

async function getData() {
  const session = await getServerSession();
  let songs = null;
  if (session?.user) {
    songs = await getSongs();
  }
  return { songs, user: session?.user };
}

export default async function Page() {
  const { songs, user } = await getData();

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.name}!</h1>
          {songs && <PageContent songs={songs} />}
        </div>
      ) : (
        <h1>Please log in to see your songs.</h1>
      )}
    </div>
  );
}
