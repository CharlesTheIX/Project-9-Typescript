type Props = {
  width?: number;
  height?: number;
  className?: string;
  primaryColor?: string;
};

const Document_SVG: React.FC<Props> = (props: Props) => {
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
      <path d="M8 12H9M16 12H12" stroke={primaryColor} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M16 8H15M12 8H8" stroke={primaryColor} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M8 16H13" stroke={primaryColor} strokeWidth={1.5} strokeLinecap="round" />
      <path
        strokeWidth={1.5}
        stroke={primaryColor}
        strokeLinecap="round"
        d="M3 14V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C20.4816 3.82476 20.7706 4.69989 20.8985 6M21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3.51839 20.1752 3.22937 19.3001 3.10149 18"
      />
    </svg>
  );
};

export default Document_SVG;
