import { Metadata } from "next";
import DashboardPage from "@/pages/Dashboard";

export const metadata: Metadata = {
  title: "Dashboard | P9",
  description: "",
};

const Page: React.FC = () => <DashboardPage />;
export default Page;
