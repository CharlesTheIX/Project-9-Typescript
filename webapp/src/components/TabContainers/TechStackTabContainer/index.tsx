import { techStackTabs } from "./data";
import TabContainer from "../TabContainer";
const TechStackTabsContainer: React.FC = () => <TabContainer initialActiveTab={0} tabs={techStackTabs} />;
export default TechStackTabsContainer;
