"use client";

type Props = {
  className?: string;
  callback: () => void;
  children: React.ReactNode;
};

const FunctionalButton: React.FC<Props> = (props: Props) => {
  const { className = "", callback, children } = props;

  return (
    <button
      type="button"
      className={`button ${className}`}
      onClick={() => {
        callback();
      }}
    >
      {children}
    </button>
  );
};

export default FunctionalButton;
