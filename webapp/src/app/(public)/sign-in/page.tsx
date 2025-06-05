import { Metadata } from "next";
import SignInPage from "@/pages/SignIn";

export const metadata: Metadata = {
  title: "Sign In | P9",
  description: ""
};

const Page: React.FC = () => <SignInPage />;
export default Page;
