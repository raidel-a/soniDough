"use client";

import * as Slider from "@radix-ui/react-slider";

interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
}

const VolSlider: React.FC<SliderProps> = ({ value = 1, onChange }) => {
  // const handleChange = (newValue: number[]) => {
  //   onChange?.(newValue[0]);
  // };

  return (
    <Slider.Root
      className="relative flex items-center select-none touch-none w-2 h-full"
      defaultValue={[value]}
      onValueChange={(newValue) => onChange && onChange(newValue[0])}
      max={1}
      step={0.1}
      orientation="vertical"
      aria-label="Volume"
    >
      <Slider.Track className="bg-neutral-600 relative grow rounded-full h-full">
        <Slider.Range className="absolute bg-white rounded-full w-2" />
      </Slider.Track>
    </Slider.Root>
  );
};

export default VolSlider;
