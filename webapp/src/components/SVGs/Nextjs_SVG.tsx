type Props = {
  width?: number;
  height?: number;
  className?: string;
  primaryColor?: string;
};

const Nextjs_SVG: React.FC<Props> = (props: Props) => {
  const { className = "", width = 24, height = 24, primaryColor = "inherit" } = props;

  return (
    <svg
      fill={"none"}
      width={width}
      height={height}
      viewBox="0 0 17 17"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        transform="translate(1, 1)"
        fillRule="evenodd"
        clipRule="evenodd"
        fill={primaryColor}
        d="M0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5C15 10.087 13.6902 12.3681 11.6975 13.7163L4.90687 4.20942C4.78053 4.03255 4.5544 3.95756 4.34741 4.02389C4.14042 4.09022 4 4.28268 4 4.50004V12H5V6.06027L10.8299 14.2221C9.82661 14.7201 8.696 15 7.5 15C3.35786 15 0 11.6421 0 7.5ZM10 10V4H11V10H10Z"
      />
    </svg>
  );
};

export default Nextjs_SVG;
