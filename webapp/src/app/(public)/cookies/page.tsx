import { Metadata } from "next";
import CookiesPage from "@/pages/Cookies";

export const metadata: Metadata = {
  title: "Cookies Page",
  description: "",
};

const Page: React.FC = () => <CookiesPage />;
export default Page;
