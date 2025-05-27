import { Metadata } from "next";
import SignInPage from "@/pages/SignIn";

export const metadata: Metadata = {
  title: "Sign In Page",
  description: "",
};

const Page: React.FC = () => <SignInPage />;
export default Page;
