import { Metadata } from "next";
import UsersAdminPage from "@/pages/Users/admin";

export const metadata: Metadata = {
  title: "Users | Admin | P9",
  description: ""
};

const Page: React.FC = () => <UsersAdminPage />;
export default Page;
