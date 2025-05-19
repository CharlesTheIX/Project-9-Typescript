'use client';

type Props = {
  content: string;
  className?: string;
  callback: () => void;
};

const FunctionalButton: React.FC<Props> = (props: Props) => {
  const { className = '', callback, content } = props;

  return (
    <button
      className={`${className}`}
      onClick={() => {
        callback();
      }}
    >
      {content}
    </button>
  );
};

export default FunctionalButton;
