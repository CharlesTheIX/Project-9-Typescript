import { Metadata } from "next";
import CountryAdminPage from "@/pages/Countries/admin";

export const metadata: Metadata = {
  title: "Country Admin Page",
  description: "",
};

const Page: React.FC = () => <CountryAdminPage />;

export default Page;
