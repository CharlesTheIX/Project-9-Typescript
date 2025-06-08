type Props = {
  width?: number;
  height?: number;
  className?: string;
  primaryColor?: string;
};

const Email_SVG: React.FC<Props> = (props: Props) => {
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
        strokeWidth={1.5}
        stroke={primaryColor}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
      />
      <path
        strokeWidth={1.5}
        stroke={primaryColor}
        strokeLinecap="round"
        d="M18.7698 7.7688L13.2228 12.0551C12.5025 12.6116 11.4973 12.6116 10.777 12.0551L5.22998 7.7688"
      />
    </svg>
  );
};

export default Email_SVG;
