type Props = {
  width?: number;
  height?: number;
  className?: string;
  primaryColor?: string;
};

const Edit_SVG: React.FC<Props> = (props: Props) => {
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
      <g>
        <g>
          <g>
            <path
              fill="none"
              strokeWidth={2}
              stroke={primaryColor}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8"
            />

            <polygon
              fill="none"
              strokeWidth={2}
              stroke={primaryColor}
              strokeLinecap="round"
              strokeLinejoin="round"
              points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Edit_SVG;
