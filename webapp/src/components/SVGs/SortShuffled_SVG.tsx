type Props = {
  width?: number;
  height?: number;
  className?: string;
  primaryColor?: string;
};

const SortShuffled_SVG: React.FC<Props> = (props: Props) => {
  const { className = "", width = 24, height = 24, primaryColor = "inherit" } = props;

  return (
    <svg
      fill={"none"}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22 7L9 7M2 7L5 7" stroke={primaryColor} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M19 12H16M5 12L12 12" stroke={primaryColor} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M16 17H8" stroke={primaryColor} strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
};

export default SortShuffled_SVG;
