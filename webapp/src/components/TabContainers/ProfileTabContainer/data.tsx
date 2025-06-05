import MenuTab from "./Tabs/MenuTab";
import FriendsTab from "./Tabs/FriendsTab";
import DetailsTab from "./Tabs/DetailsTab";
import NotificationsTab from "./Tabs/Notifications";

export const profileTabs: Tab[] = [
  {
    title: "Friends",
    content: <FriendsTab />,
  },
  {
    title: "Details",
    content: <DetailsTab />,
  },
  {
    title: "Menu",
    content: <MenuTab />,
  },
  {
    title: "Notifications",
    content: <NotificationsTab />
  }
];

