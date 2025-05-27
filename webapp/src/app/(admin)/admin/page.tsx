import { Metadata } from "next";
import AdminPage from "@/pages/Admin";

export const metadata: Metadata = {
  title: "Admin Page",
  description: "",
};

const Page: React.FC = () => <AdminPage />;
export default Page;
