"use client";

type Props = {
  content: string;
  className?: string;
  callback: () => void;
};

const FunctionalButton: React.FC<Props> = (props: Props) => {
  const { className = "", callback, content } = props;

  return (
    <button
      type="button"
      className={`${className} cursor-pointer p-4`}
      onClick={() => {
        callback();
      }}
    >
      {content}
    </button>
  );
};

export default FunctionalButton;
