"use client";
import SpinnerSVG from "@/SVGs/Spinner_SVG";

const LoadingContainer: React.FC = () => {
  return (
    <div className="loading-spinner">
      <div className="animate-spin">
        <SpinnerSVG width={100} height={100} />
      </div>
    </div>
  );
};
export default LoadingContainer;
