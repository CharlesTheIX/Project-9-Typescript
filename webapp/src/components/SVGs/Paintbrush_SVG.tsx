type Props = {
  width?: number;
  height?: number;
  className?: string;
  primaryColor?: string;
};

const Paintbrush_SVG: React.FC<Props> = (props: Props) => {
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
      <rect
        x="7.54"
        y="5.07"
        width="13.81"
        height="8.98"
        strokeWidth={2}
        stroke={primaryColor}
        strokeMiterlimit={10}
        transform="translate(10.99 -7.41) rotate(45)"
      />
      <path
        strokeWidth={2}
        stroke={primaryColor}
        strokeMiterlimit={10}
        d="M16.15,17.62,14.6,19.17a2,2,0,0,1-2.76,0l-2-2L5,21.89a2.08,2.08,0,0,1-1.47.61h0A2.07,2.07,0,0,1,1.5,20.43h0A2.08,2.08,0,0,1,2.11,19L6.87,14.2l-2-2a2,2,0,0,1,0-2.76L6.38,7.85Z"
      />
      <line x1="15.66" y1="4.43" x2="11.27" y2="8.83" stroke={primaryColor} strokeMiterlimit={10} strokeWidth={2} />
    </svg>
  );
};

export default Paintbrush_SVG;
