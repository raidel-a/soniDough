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
      className="relative flex items-center select-none touch-none w-full h-5"
      defaultValue={[0]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="Song Progress"
    >
      <Prog.Track className="bg-neutral-600 relative grow rounded-full h-[3px]">
        <Prog.Range className="absolute bg-white rounded-full h-full" />
      </Prog.Track>
    </Prog.Root>
  );
};

export default ProgBar;
