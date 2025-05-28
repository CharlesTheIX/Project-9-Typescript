type Props = {
  width?: number;
  height?: number;
  className?: string;
  primaryColor?: string;
};

const SignOut_SVG: React.FC<Props> = (props: Props) => {
  const { className = "", width = 24, height = 24, primaryColor = "inherit" } = props;

  return (
    <svg
      width={width}
      height={height}
      fill={primaryColor}
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline
        fill={"none"}
        strokeWidth={2}
        stroke={primaryColor}
        strokeLinecap="round"
        points="6 15 3 12 6 9"
        strokeLinejoin="round"
      />
      <polyline
        fill={"none"}
        strokeWidth={2}
        stroke={primaryColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        points="11 15 8 12 11 9"
      />
      <line
        x1="8"
        y1="12"
        x2="17"
        y2="12"
        fill={"none"}
        strokeWidth={2}
        stroke={primaryColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fill={"none"}
        strokeWidth={2}
        stroke={primaryColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10,5V4a1,1,0,0,1,1-1h9a1,1,0,0,1,1,1V20a1,1,0,0,1-1,1H11a1,1,0,0,1-1-1V19"
      />
    </svg>
  );
};

export default SignOut_SVG;
