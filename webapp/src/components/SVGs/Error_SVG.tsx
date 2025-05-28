type Props = {
  width?: number;
  height?: number;
  className?: string;
  primaryColor?: string;
};

const Error_SVG: React.FC<Props> = (props: Props) => {
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
      <path
        strokeWidth={2.5}
        stroke={primaryColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 16H12.01M12 8V12M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
      />
    </svg>
  );
};

export default Error_SVG;
