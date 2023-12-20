import getSongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "./components/SearchContent";

export const revalidate = 0;

interface SearchProps {
  searchParams: { title: string };
}

const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title);

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="from-gray-500">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold first-letter:text-4xl">
            Search
            {/* TODO: make sidebar search a field */}
            {/* {'Search results for "' + searchParams.title + '"'} */}
          </h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />
    </div>
  );
};

export default Search;
