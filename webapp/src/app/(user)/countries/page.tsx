import { Metadata } from "next";
import CountriesPage from "@/pages/Countries";

export const metadata: Metadata = {
  title: "Countries | P9",
  description: "",
};

const Page: React.FC = () => <CountriesPage />;
export default Page;
