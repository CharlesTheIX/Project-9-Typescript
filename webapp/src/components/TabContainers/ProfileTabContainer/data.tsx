import MenuTab from "./Tabs/MenuTab";
import DetailsTab from "./Tabs/DetailsTab";
import ContactsTab from "./Tabs/ContactsTab";
import NotificationsTab from "./Tabs/Notifications";

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
