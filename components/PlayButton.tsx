import { FaPlay } from "react-icons/fa";

const PlayButton = () => {
  return (
    <button className="transition opacity-0 rounded-full flex items-center bg-blue-500 p-4 drop-shadox-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 active:scale-90">
      <FaPlay className="text-black" />
    </button>
  );
};

export default PlayButton;
