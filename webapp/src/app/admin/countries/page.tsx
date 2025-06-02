import { Metadata } from "next";
import CountryAdminPage from "@/pages/Countries/admin";

export const metadata: Metadata = {
  title: "Countries | Admin | P9",
  description: "",
};

const Page: React.FC = () => <CountryAdminPage />;

export default Page;
