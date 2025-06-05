import MenuTab from "@/components/TabContainers/ProfileTabContainer/Tabs/MenuTab";
import FriendsTab from "@/components/TabContainers/ProfileTabContainer/Tabs/FriendsTab";
import DetailsTab from "@/components/TabContainers/ProfileTabContainer/Tabs/DetailsTab";
import NotificationsTab from "@/components/TabContainers/ProfileTabContainer/Tabs/Notifications";

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
