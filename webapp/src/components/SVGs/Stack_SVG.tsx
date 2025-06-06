type Props = {
  width?: number;
  height?: number;
  className?: string;
  primaryColor?: string;
};

const Stack_SVG: React.FC<Props> = (props: Props) => {
  const { className = "", width = 24, height = 24, primaryColor = "inherit" } = props;

  return (
    <svg
      fill={primaryColor}
      width={width}
      height={height}
      viewBox="0 0 256 256"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M230.91016,171.96924a7.99926,7.99926,0,0,1-2.87891,10.94092l-96,56a8.00059,8.00059,0,0,1-8.0625,0l-96-56a8.00008,8.00008,0,0,1,8.0625-13.82032L128,222.73828l91.96875-53.64844A8.00093,8.00093,0,0,1,230.91016,171.96924Zm-10.94141-50.8794L128,174.73828,36.03125,121.08984a8.00008,8.00008,0,0,0-8.0625,13.82032l96,56a8.00059,8.00059,0,0,0,8.0625,0l96-56a8.00008,8.00008,0,0,0-8.0625-13.82032Zm-192-34.17968,96,56a8.00059,8.00059,0,0,0,8.0625,0l96-56a8.00016,8.00016,0,0,0,0-13.82032l-96-56a8.00059,8.00059,0,0,0-8.0625,0l-96,56a8.00016,8.00016,0,0,0,0,13.82032Z" />
    </svg>
  );
};

export default Stack_SVG;
