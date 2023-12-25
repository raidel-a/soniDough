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
      <Prog.Track className="bg-neutral-900 relative grow rounded-full h-[4px]">
        <Prog.Range className="absolute bg-white rounded-full h-full" />
      </Prog.Track>
      <Prog.Thumb
        className="block rounded-[3px] w-3 h-3 shadow-[0_0_2px_1px] shadow-gray-500 bg-white active:w-[6px] active:h-[16px] hover:scale-125"
        aria-label="Song Progress"
      />
    </Prog.Root>
  );
};

export default ProgBar;
