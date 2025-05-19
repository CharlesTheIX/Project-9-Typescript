'use client';

import Link from 'next/link';

type Props = {
  link: string;
  content: string;
  target?: string;
  className?: string;
};

const InternalLinkButton: React.FC<Props> = (props: Props) => {
  const { className = '', link, content, target = '_self' } = props;

  return (
    <Link href={link} target={target} className={`${className}`}>
      {content}
    </Link>
  );
};

export default InternalLinkButton;
