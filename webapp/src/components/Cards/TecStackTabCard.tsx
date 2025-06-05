import Link from "next/link";
import getSvg from "@/lib/getSvg";

export type TechStackTabCardData = {
  icon?: string;
  title?: string;
  content?: string;
  documentationLink?: string;
};

const TechStackTabCard: React.FC<TechStackTabCardData> = (props: TechStackTabCardData) => {
  const { title, icon, content, documentationLink } = props;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-2 items-center justify-start w-full">
        {icon && <>{getSvg({ icon, size: 50 })}</>}
        {title && <h3>{title}</h3>}
      </div>

      {content && <p className="w-full">{content}</p>}

      {documentationLink && (
        <Link href={documentationLink} className="link-text">
          Documentation
        </Link>
      )}
    </div>
  );
};

export default TechStackTabCard;
