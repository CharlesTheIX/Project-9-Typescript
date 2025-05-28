type Props = {
  width?: number;
  height?: number;
  className?: string;
  primaryColor?: string;
};

const Spinner_SVG: React.FC<Props> = (props: Props) => {
  const { className = "", width = 24, height = 24, primaryColor = "inherit" } = props;

  return (
    <svg
      fill="none"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeWidth={1}
        fill={primaryColor}
        d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z"
      />
      <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill={primaryColor} strokeWidth={1} />
    </svg>
  );
};

export default Spinner_SVG;
