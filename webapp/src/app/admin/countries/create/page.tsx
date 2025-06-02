import { Metadata } from "next";
import CountryCreationPage from "@/pages/Countries/create";

export const metadata: Metadata = {
  title: "Country Creation | Admin | P9",
  description: "",
};

const Page: React.FC = () => <CountryCreationPage />;

export default Page;
