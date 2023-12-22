import React from 'react';
import * as Progress from '@radix-ui/react-progress';

interface ProgressBarProps {
  progress: number;
  songDuration: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, songDuration }) => {

  
  return (
    <Progress.Root
      className="relative overflow-hidden bg-gray-700 rounded-full w-[300px] h-[7px]"
      style={{
        // Fix overflow clipping in Safari
        // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
        transform: 'translateZ(0)',
      }}
      value={progress}
      max={songDuration}
    >
      <Progress.Indicator
        className="bg-white w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
        style={{ transform: `translateX(-${songDuration - progress}%)` }}
      />
    </Progress.Root>
  );
};

export default ProgressBar;