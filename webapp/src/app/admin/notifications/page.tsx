import { Metadata } from "next";
import NotificationsAdminPage from "@/pages/Notifications/admin";

export const metadata: Metadata = {
  title: "Notifications | Admin | P9",
  description: ""
};

const Page: React.FC = () => <NotificationsAdminPage />;
export default Page;
