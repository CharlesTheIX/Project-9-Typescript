import { Metadata } from "next";
import SignUpPage from "@/pages/SignUp";

export const metadata: Metadata = {
  title: "Sign Up Page",
  description: "",
};

const Page: React.FC = () => {
  return <SignUpPage />;
};

export default Page;
