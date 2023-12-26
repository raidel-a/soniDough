"use client";

import * as Prog from "@radix-ui/react-slider";

interface ProgBarProps {
  value?: number;
  onChange?: (value: number) => void;
}

const ProgBar: React.FC<ProgBarProps> = ({ value = 0, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <Prog.Root
      className="topsy relative flex items-center select-none touch-none w-full h-5"
      defaultValue={[0.5]}
      // value={[value]}
      // onValueChange={handleChange}
      max={1}
      step={0.001}
      aria-label="Song Seeker"
    >
      <Prog.Track className="bg-neutral-700 relative grow rounded-full h-[4px]">
        <Prog.Range className="absolute bg-white rounded-full h-full" />
      </Prog.Track>
      <Prog.Thumb
        className="block rounded-[3px] w-[26px] h-[10px] shadow-[0_0_2px_2px]
         shadow-gray-500 bg-gray-300 focus:rotate-90 duration-500 active:rotate-90 hover:scale-125 active:scale-100"
        aria-label="Song Progress"
      />
    </Prog.Root>
  );
};

export default ProgBar;
