type Props = {
  width?: number;
  height?: number;
  className?: string;
  primaryColor?: string;
};

const Terminal_SVG: React.FC<Props> = (props: Props) => {
  const { className = "", width = 24, height = 24, primaryColor = "inherit" } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={primaryColor}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeWidth={0.5}
        fill={primaryColor}
        d="M5.0333 14.8284L6.44751 16.2426L10.6902 12L6.44751 7.75733L5.0333 9.17155L7.86172 12L5.0333 14.8284Z"
      />
      <path d="M15 14H11V16H15V14Z" fill={primaryColor} strokeWidth={0.5} />
      <path
        strokeWidth={0.5}
        fillRule="evenodd"
        clipRule="evenodd"
        fill={primaryColor}
        d="M2 2C0.895431 2 0 2.89543 0 4V20C0 21.1046 0.89543 22 2 22H22C23.1046 22 24 21.1046 24 20V4C24 2.89543 23.1046 2 22 2H2ZM22 4H2L2 20H22V4Z"
      />
    </svg>
  );
};

export default Terminal_SVG;
