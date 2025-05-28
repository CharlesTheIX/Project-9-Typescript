type Props = {
  width?: number;
  height?: number;
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
};

const Edit_SVG: React.FC<Props> = (props: Props) => {
  const { className = "", width = 24, height = 24, primaryColor = "inherit", secondaryColor = "inherit" } = props;

  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill={primaryColor} width={width} height={height} viewBox="0 0 24 24">
      <g>
        <g>
          <g>
            <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke={primaryColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />

            <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke={primaryColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          </g>
        </g>
      </g>
    </svg>
  );
};
export default Edit_SVG;
