type Props = {
  width?: number;
  height?: number;
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
};

const Eye_SVG: React.FC<Props> = (props: Props) => {
  const { className = "", width = 20, height = 20, primaryColor = "inherit", secondaryColor = "inherit" } = props;

  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width={`${width}px`} height={`${height}px`} viewBox="0 0 24 24" fill="none">
      <path
        d="M9 4.45962C9.91153 4.16968 10.9104 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C3.75612 8.07914 4.32973 7.43025 5 6.82137"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke={primaryColor} strokeWidth="1.5" />
    </svg>
  );
};
export default Eye_SVG;
