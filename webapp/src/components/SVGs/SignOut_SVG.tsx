type Props = {
  width?: number;
  height?: number;
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
};

const SignOut_SVG: React.FC<Props> = (props: Props) => {
  const { className = "", width = 24, height = 24, primaryColor = "inherit", secondaryColor = "inherit" } = props;

  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill={primaryColor} width={width} height={height} viewBox="0 0 24 24">
      <polyline points="6 15 3 12 6 9" fill={"none"} stroke={primaryColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <polyline points="11 15 8 12 11 9" fill={"none"} stroke={primaryColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <line x1="8" y1="12" x2="17" y2="12" fill={"none"} stroke={primaryColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <path
        d="M10,5V4a1,1,0,0,1,1-1h9a1,1,0,0,1,1,1V20a1,1,0,0,1-1,1H11a1,1,0,0,1-1-1V19"
        fill={"none"}
        stroke={primaryColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
};
export default SignOut_SVG;
