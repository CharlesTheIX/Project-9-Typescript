import { databaseTabCardData } from "../data";
import TechStackTabCard, { TechStackTabCardData } from "@/components/Cards/TecStackTabCard";

const DatabaseTab: React.FC = () => {
  return (
    <div className="flex flex-col gap-10">
      {databaseTabCardData.map((item: TechStackTabCardData, key: number) => {
        return (
          <TechStackTabCard
            key={key}
            icon={item.icon}
            title={item.title}
            content={item.content}
            documentationLink={item.documentationLink}
          />
        );
      })}
    </div>
  );
};

export default DatabaseTab;
