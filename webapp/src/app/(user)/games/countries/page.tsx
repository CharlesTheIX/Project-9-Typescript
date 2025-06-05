import { Metadata } from "next";
import CountryGamesPage from "@/pages/Games/Countries";

export const metadata: Metadata = {
  title: "Countries | Games | P9",
  description: ""
};

const Page: React.FC = () => <CountryGamesPage />;
export default Page;
