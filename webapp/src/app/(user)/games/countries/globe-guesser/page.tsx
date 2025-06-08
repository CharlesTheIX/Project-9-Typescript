import { Metadata } from "next";
import GlobeGuessingGamePage from "@/pages/Games/Countries/globe-guessing";

export const metadata: Metadata = {
  title: "Globe Guesser | Countries | Games | P9",
  description: "",
};

const Page: React.FC = () => <GlobeGuessingGamePage />;
export default Page;
