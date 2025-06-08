import { Metadata } from "next";
import FlagGuessingGamePage from "@/pages/Games/Countries/flag-guessing";

export const metadata: Metadata = {
  title: "Flag Guesser | Countries | Games | P9",
  description: "",
};

const Page: React.FC = () => <FlagGuessingGamePage />;
export default Page;
