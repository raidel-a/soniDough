"use client";

import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";
import { useEffect, useState } from "react";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import useSound from "use-sound";
import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import ProgBar from "./ProgBar";
import VolSlider from "./VolSlider";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [isPlaying, setIsPlaying] = useState(false);

  const initialVolume = parseFloat(localStorage.getItem("playerVolume") || "1");
  const initialLastNonZeroVolume = parseFloat(
    localStorage.getItem("lastNonZeroVolume") || initialVolume.toString(),
  );

  const [volume, setVolume] = useState(initialVolume);
  const [lastNonZeroVolume, setLastNonZeroVolume] = useState(
    initialLastNonZeroVolume,
  );

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrev = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const prevSong = player.ids[currentIndex - 1];

    if (!prevSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(prevSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3", "flac", "wav"],
  });

  useEffect(() => {
    sound?.play();
    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };
  //  TODO: Rewrite handling of mute
  const toggleMute = () => {
    if (volume > 0) {
      setLastNonZeroVolume(volume); // Save the current volume before muting
      setVolume(0);
    } else {
      setVolume((prev) => (prev === 0 ? lastNonZeroVolume : prev));
    }
  };
  useEffect(() => {
    localStorage.setItem("playerVolume", volume.toString());
    localStorage.setItem("lastNonZeroVolume", lastNonZeroVolume.toString());
  }, [volume, lastNonZeroVolume]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-1">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer hover:scale-105 active:scale-90">
          <Icon onClick={handlePlay} size={30} className="text-black" />
        </div>
        div
      </div>

      <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-2">
        <AiFillStepBackward
          onClick={onPlayPrev}
          size={27}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />

        <div
          onClick={handlePlay}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer hover:scale-105 active:scale-90"
        >
          <Icon size={30} className="text-black" />
        </div>

        <AiFillStepForward
          onClick={onPlayNext}
          size={27}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>

      <div className="hidden md:flex w-auto justify-end pr-2">
        <div className="flex items-center gap-x-2 w-auto">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={25}
          />
          <VolSlider
            key={volume}
            value={volume}
            onChange={(value) => setVolume(value)}
          />
        </div>
      </div>

      <div className="fixed pr-4 w-screen items-center bottom-20">
        <ProgBar value={0.5} onChange={() => {}} />
      </div>
    </div>
  );
};

export default PlayerContent;
 