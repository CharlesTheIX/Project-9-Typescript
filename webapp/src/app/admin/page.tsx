import { Metadata } from "next";
import AdminPage from "@/pages/Admin";

export const metadata: Metadata = {
  title: "Admin | P9",
  description: ""
};

const Page: React.FC = () => <AdminPage />;
export default Page;
