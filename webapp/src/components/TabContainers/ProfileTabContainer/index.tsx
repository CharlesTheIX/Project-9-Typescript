import { profileTabs } from "./data";
import TabContainer from "../TabContainer";
const ProfileTabContainer: React.FC = () => <TabContainer initialActiveTab={0} tabs={profileTabs} />;
export default ProfileTabContainer;
