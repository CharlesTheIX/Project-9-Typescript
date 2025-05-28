import { Metadata } from "next";
import CountriesPage from "@/pages/Countries";

export const metadata: Metadata = {
  title: "Countries Page",
  description: "",
};

const Page: React.FC = () => <CountriesPage />;

export default Page;
