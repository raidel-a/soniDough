import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import getSongs from "@/actions/getSongs";
import PageContent from "./components/PageContent";
import { useUser } from "@/hooks/useUser";
import { GetServerSideProps } from 'next';


export const revalidate = 0;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = context.req; // Assuming you have user in request object

  let songs = null;
  if (user) {
    songs = await getSongs(); // Assuming getSongs is a function that fetches songs
  }

  return {
    props: {
      songs,
      user
    },
  };
};

const Page = ({ songs, user }) => (
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

export default Page;