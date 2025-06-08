type Props = {
  width?: number;
  height?: number;
  className?: string;
  primaryColor?: string;
};

const Pending_SVG: React.FC<Props> = (props: Props) => {
  const { className = "", width = 24, height = 24, primaryColor = "inherit" } = props;

  return (
    <svg
      width={width}
      height={height}
      fill={primaryColor}
      viewBox="0 0 32 32"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="16" r="2" fill={primaryColor} />
      <circle cx="23" cy="16" r="2" fill={primaryColor} />
      <circle cx="16" cy="16" r="2" fill={primaryColor} />
      <path
        d="M16,30A14,14,0,1,1,30,16,14.0158,14.0158,0,0,1,16,30ZM16,4A12,12,0,1,0,28,16,12.0137,12.0137,0,0,0,16,4Z"
        fill={primaryColor}
      />
    </svg>
  );
};

export default Pending_SVG;
