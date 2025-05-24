import { Metadata } from "next";
import CountryCreationPage from "@/pages/Countries/create";

export const metadata: Metadata = {
  title: "Country Creation Page",
  description: "",
};

const Page: React.FC = () => {
  return <CountryCreationPage />;
};

export default Page;
