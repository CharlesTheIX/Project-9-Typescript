import { Metadata } from "next";
import MemoryGamePage from "@/pages/Games/Countries/memory";

export const metadata: Metadata = {
  title: "Memory | Countries | Games | P9",
  description: ""
};

const Page: React.FC = () => <MemoryGamePage />;
export default Page;
