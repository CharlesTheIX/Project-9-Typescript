type Props = {
  width?: number;
  height?: number;
  className?: string;
  primaryColor?: string;
};

const SignIn_SVG: React.FC<Props> = (props: Props) => {
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
        strokeLinejoin="round"
        points="18 9 21 12 18 15"
      />
      <polyline
        fill={"none"}
        strokeWidth={2}
        stroke={primaryColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        points="13 9 16 12 13 15"
      />
      <line
        x1="16"
        y1="12"
        x2="7"
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
        d="M14,19v1a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V4A1,1,0,0,1,4,3h9a1,1,0,0,1,1,1V5"
      />
    </svg>
  );
};

export default SignIn_SVG;
