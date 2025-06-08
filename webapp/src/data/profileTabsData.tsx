import MenuTab from "@/components/TabContainers/ProfileTabContainer/Tabs/MenuTab";
import DetailsTab from "@/components/TabContainers/ProfileTabContainer/Tabs/DetailsTab";
import ContactsTab from "@/components/TabContainers/ProfileTabContainer/Tabs/ContactsTab";
import NotificationsTab from "@/components/TabContainers/ProfileTabContainer/Tabs/Notifications";

export const profileTabs: Tab[] = [
  {
    title: "Contacts",
    content: <ContactsTab />,
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
    content: <NotificationsTab />,
  },
];
