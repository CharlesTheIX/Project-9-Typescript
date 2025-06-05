"use client";
import SpinnerSVG from "@/SVGs/Spinner_SVG";

type Props = {
  size?: number;
}

const LoadingContainer: React.FC<Props> = (props: Props) => {
  const { size = 100 } =props;

  return (
    <div className="loading-spinner w-full h-full flex items-center justify-start">
      <div className="animate-spin">
        <SpinnerSVG width={size} height={size} />
      </div>
    </div>
  );
};
export default LoadingContainer;
