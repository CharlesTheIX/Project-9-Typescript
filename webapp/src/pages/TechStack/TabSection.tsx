import Link from "next/link";
import getSvg from "@/lib/getSvg";
import TabContainer from "@/components/TabContainer";
import {
  apiTabCardData,
  ciCdTabCardData,
  webappTabCardData,
  databaseTabCardData,
  servicesTabCardData,
  infrastructureTabCardData,
} from "@/data/techStackTabSectionData";

export type CardData = {
  icon?: string;
  title?: string;
  content?: string;
  documentationLink?: string;
};

export const Card: React.FC<CardData> = (props: CardData) => {
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

export const tabs: Tab[] = [
  {
    title: "Webapp",
    content: (
      <div className="flex flex-col gap-10">
        {webappTabCardData.map((item: CardData, key: number) => {
          return (
            <Card
              key={key}
              icon={item.icon}
              title={item.title}
              content={item.content}
              documentationLink={item.documentationLink}
            />
          );
        })}
      </div>
    ),
  },
  {
    title: "API",
    content: (
      <div className="flex flex-col gap-10">
        {apiTabCardData.map((item: CardData, key: number) => {
          return (
            <Card
              key={key}
              icon={item.icon}
              title={item.title}
              content={item.content}
              documentationLink={item.documentationLink}
            />
          );
        })}
      </div>
    ),
  },
  {
    title: "Database",
    content: (
      <div className="flex flex-col gap-10">
        {databaseTabCardData.map((item: CardData, key: number) => {
          return (
            <Card
              key={key}
              icon={item.icon}
              title={item.title}
              content={item.content}
              documentationLink={item.documentationLink}
            />
          );
        })}
      </div>
    ),
  },
  {
    title: "Services",
    content: (
      <div className="flex flex-col gap-10">
        {servicesTabCardData.map((item: CardData, key: number) => {
          return (
            <Card
              key={key}
              icon={item.icon}
              title={item.title}
              content={item.content}
              documentationLink={item.documentationLink}
            />
          );
        })}
      </div>
    ),
  },
  {
    title: "CI / CD",
    content: (
      <div className="flex flex-col gap-10">
        {ciCdTabCardData.map((item: CardData, key: number) => {
          return (
            <Card
              key={key}
              icon={item.icon}
              title={item.title}
              content={item.content}
              documentationLink={item.documentationLink}
            />
          );
        })}
      </div>
    ),
  },
  {
    title: "Infrastructure",
    content: (
      <div className="flex flex-col gap-10">
        {infrastructureTabCardData.map((item: CardData, key: number) => {
          return (
            <Card
              key={key}
              icon={item.icon}
              title={item.title}
              content={item.content}
              documentationLink={item.documentationLink}
            />
          );
        })}
      </div>
    ),
  },
];

const TabSection: React.FC = () => {
  return (
    <section>
      <TabContainer initialActiveTab={0} tabs={tabs} />
    </section>
  );
};

export default TabSection;
