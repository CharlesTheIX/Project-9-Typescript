type Props = {
  width?: number;
  height?: number;
  className?: string;
  primaryColor?: string;
};

const SortAsc_SVG: React.FC<Props> = (props: Props) => {
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
      <path d="M4 16L13 16" stroke={primaryColor} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M6 11H13" stroke={primaryColor} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M8 6L13 6" stroke={primaryColor} strokeWidth={1.5} strokeLinecap="round" />
      <path
        strokeWidth={1.5}
        d="M17 4L17 20L20 16"
        stroke={primaryColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SortAsc_SVG;
