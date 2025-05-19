'use client';

type Props = {
  link: string;
  content: string;
  target?: string;
  className?: string;
};

const ExternalLinkButton: React.FC<Props> = (props: Props) => {
  const { className = '', link, content, target = '_self' } = props;

  return (
    <a href={link} target={target} className={`${className}`}>
      {content}
    </a>
  );
};

export default ExternalLinkButton;
