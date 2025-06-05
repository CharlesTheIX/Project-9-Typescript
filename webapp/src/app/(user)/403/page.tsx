import { Metadata } from "next";
import UnauthorisedPage from "@/pages/UnauthorisedPage";

export const metadata: Metadata = {
  title: "403 | P9",
  description: ""
};

const Page: React.FC = () => <UnauthorisedPage />;
export default Page;
