import { FaPlay } from "react-icons/fa";

const PlayButton = () => {
  return (
    <button className="
    transition 
    duration-300
    opacity-0 
    rounded-full 
    flex 
    items-center 
    bg-blue-500 
    p-4 
    drop-shadox-md
    group-hover:opacity-90
    group-hover:rotate-[360deg] 
    hover:scale-110 
    active:scale-90">

      <FaPlay className="text-black" />
    </button>
  );
};

export default PlayButton;
