import { twMerge } from 'tailwind-merge';

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (
    <div
      className={twMerge('rounded-lg h-fit w-full overflow-hidden relative', className)}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-neutral-900 grainy-background ">
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};



export default Box;
