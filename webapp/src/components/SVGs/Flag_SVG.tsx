type Props = {
  width?: number;
  height?: number;
  className?: string;
  primaryColor?: string;
};

const Flag_SVG: React.FC<Props> = (props: Props) => {
  const { className = "", width = 24, height = 24, primaryColor = "inherit" } = props;

  return (
    <svg
      width={width}
      height={height}
      fill={primaryColor}
      viewBox="0 0 64 64"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M48.43,35.1h-11a2,2,0,0,1,0-4h7.39l-4.25-6.8a2,2,0,0,1,0-2.12l4.25-6.8H17.57V31.1h7.16a2,2,0,0,1,0,4H15.57a2,2,0,0,1-2-2V13.38a2,2,0,0,1,2-2H48.43a2,2,0,0,1,1.7,3.06l-5.5,8.8,5.5,8.8a2,2,0,0,1-1.7,3.06Z" />
      <path d="M15.57,57a2,2,0,0,1-2-2V9a2,2,0,0,1,4,0V55A2,2,0,0,1,15.57,57Z" />
      <path d="M42,25H30a2,2,0,0,1,0-4H42a2,2,0,0,1,0,4Z" />
    </svg>
  );
};

export default Flag_SVG;
