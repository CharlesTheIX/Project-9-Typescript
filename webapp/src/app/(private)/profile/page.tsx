import { Metadata } from "next";
import ProfilePage from "@/pages/Profile";

export const metadata: Metadata = {
  title: "Profile Page",
  description: "",
};

const Page: React.FC = () => <ProfilePage />;
export default Page;
