type Props = {
  width?: number;
  height?: number;
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
  direction?: "up" | "down" | "left" | "right";
};

const Chevron_SVG: React.FC<Props> = (props: Props) => {
  const { className = "", width = 24, height = 24, primaryColor = "inherit", secondaryColor = "inherit", direction = "down" } = props;

  switch (direction) {
    case "down":
      return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" fill={primaryColor} width={width} height={height} viewBox="0 -4.5 24 24">
          <g stroke={primaryColor} strokeWidth={1} fill={primaryColor} fillRule="evenodd">
            <g transform="translate(-574.000000, -1201.000000)" fill={primaryColor}>
              <path d="M597.405,1201.63 C596.576,1200.8 595.23,1200.8 594.401,1201.63 L586.016,1210.88 L577.63,1201.63 C576.801,1200.8 575.455,1200.8 574.626,1201.63 C573.797,1202.46 573.797,1203.81 574.626,1204.64 L584.381,1215.4 C584.83,1215.85 585.429,1216.05 586.016,1216.01 C586.603,1216.05 587.201,1215.85 587.65,1215.4 L597.405,1204.64 C598.234,1203.81 598.234,1202.46 597.405,1201.63" />
            </g>
          </g>
        </svg>
      );
  }
};
export default Chevron_SVG;
