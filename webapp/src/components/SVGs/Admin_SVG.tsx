type Props = {
  width?: number;
  height?: number;
  className?: string;
  primaryColor?: string;
};

const Admin_SVG: React.FC<Props> = (props: Props) => {
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
        strokeWidth={2}
        stroke={primaryColor}
        strokeLinejoin="round"
        d="M17.2606 11.4402C19.8781 11.4402 22 9.3269 22 6.72008C22 4.11325 19.8781 2 17.2606 2C14.643 2 12.5211 4.11325 12.5211 6.72008C12.5211 7.92754 13.0722 8.80569 13.0722 8.80569L7.3408 14.5137C7.08363 14.7698 6.72357 15.4358 7.3408 16.0505L8.00212 16.7091C8.25929 16.9286 8.90589 17.236 9.43495 16.7091L10.2065 15.9407C10.978 16.7091 11.8598 16.27 12.1904 15.8309C12.7415 15.0625 12.0802 14.2942 12.0802 14.2942L12.3007 14.0746C13.3588 15.1284 14.2846 14.5137 14.6153 14.0746C15.1664 13.3062 14.6153 12.5378 14.6153 12.5378C14.3948 12.0988 13.954 12.0988 14.505 11.5499L15.1664 10.8913C15.6954 11.3304 16.7829 11.4402 17.2606 11.4402Z"
      />
      <path
        strokeWidth={2}
        stroke={primaryColor}
        strokeLinecap="round"
        d="M22 14.993C21.9361 17.787 21.6692 19.419 20.5542 20.5341C19.0882 22 16.7288 22 12.0101 22C7.29127 22 4.93188 22 3.46594 20.5341C2 19.0681 2 16.7087 2 11.9899C2 7.27117 2 4.91177 3.46594 3.44584C4.58099 2.33078 6.21298 2.06388 9.00704 2"
      />
    </svg>
  );
};

export default Admin_SVG;
