import { Metadata } from "next";
import UsersPage from "@/pages/Users";

export const metadata: Metadata = {
  title: "Users Page",
  description: "",
};

const Page: React.FC = () => <UsersPage />;
export default Page;
