import { servicesTabCardData } from "../data";
import TechStackTabCard, { TechStackTabCardData } from "@/components/Cards/TecStackTabCard";

const ServicesTab: React.FC = () => {
  return (
    <div className="flex flex-col gap-10">
      {servicesTabCardData.map((item: TechStackTabCardData, key: number) => {
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

export default ServicesTab;
