type Props = {
  width?: number;
  height?: number;
  className?: string;
  primaryColor?: string;
};

const SortDesc_SVG: React.FC<Props> = (props: Props) => {
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
      <path d="M4 8H13" stroke={primaryColor} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M6 13H13" stroke={primaryColor} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M8 18H13" stroke={primaryColor} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M17 20V4L20 8" stroke={primaryColor} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default SortDesc_SVG;
