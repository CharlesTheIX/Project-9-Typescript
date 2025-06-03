import MenuTab from "@/pages/Profile/Tabs/MenuTab";
import FriendsTab from "@/pages/Profile/Tabs/FriendsTab";
import DetailsTab from "@/pages/Profile/Tabs/DetailsTab";

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
];
