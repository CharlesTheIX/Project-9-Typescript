import Eye_SVG from "@/SVGs/Eye_SVG";
import Pin_SVG from "@/SVGs/Pin_SVG";
import Users_SVG from "@/SVGs/Users_SVG";
import Globe_SVG from "@/SVGs/Globe_SVG";
import Admin_SVG from "@/SVGs/Admin_SVG";
import Error_SVG from "@/SVGs/Error_SVG";
import Search_SVG from "@/SVGs/Search_SVG";
import Cookie_SVG from "@/SVGs/Cookie_SVG";
import SignIn_SVG from "@/SVGs/SignIn_SVG";
import Profile_SVG from "@/SVGs/Profile_SVG";
import Terminal_SVG from "@/SVGs/Terminal_SVG";
import Bye_SVG from "@/components/SVGs/Bye_SVG";
import AWS_SVG from "@/components/SVGs/AWS_SVG";
import Dashboard_SVG from "@/SVGs/Dashboard_SVG";
import Sass_SVG from "@/components/SVGs/Sass_SVG";
import Node_SVG from "@/components/SVGs/Node_SVG";
import Mongo_SVG from "@/components/SVGs/Mongo_SVG";
import Stack_SVG from "@/components/SVGs/Stack_SVG";
import Games_SVG from "@/components/SVGs/Games_SVG";
import Nextjs_SVG from "@/components/SVGs/Nextjs_SVG";
import Github_SVG from "@/components/SVGs/Github_SVG";
import Docker_SVG from "@/components/SVGs/Docker_SVG";
import Favourite_SVG from "@/components/SVGs/Favourite";
import Success_SVG from "@/components/SVGs/Success_SVG";
import Express_SVG from "@/components/SVGs/Express_SVG";
import Tailwind_SVG from "@/components/SVGs/Tailwind_SVG";
import Document_SVG from "@/components/SVGs/Document_SVG";
import Terraform_SVG from "@/components/SVGs/Terraform_SVG";
import Typescript_SVG from "@/components/SVGs/Typescript_SVG";

type Props = {
  icon?: string;
  size?: number;
  color?: string;
};

export default (props: Props): React.ReactElement => {
  const { icon, size, color = "inherit" } = props;

  switch (icon) {
    case "games":
      return <Games_SVG width={size} height={size} primaryColor={color} />;
    case "document":
      return <Document_SVG width={size} height={size} primaryColor={color} />;
    case "terraform":
      return <Terraform_SVG width={size} height={size} primaryColor={color} />;
    case "aws":
      return <AWS_SVG width={size} height={size} primaryColor={color} />;
    case "docker":
      return <Docker_SVG width={size} height={size} primaryColor={color} />;
    case "github":
      return <Github_SVG width={size} height={size} primaryColor={color} />;
    case "mongodb":
      return <Mongo_SVG width={size} height={size} primaryColor={color} />;
    case "express":
      return <Express_SVG width={size} height={size} primaryColor={color} />;
    case "nodejs":
      return <Node_SVG width={size} height={size} primaryColor={color} />;
    case "sass":
      return <Sass_SVG width={size} height={size} primaryColor={color} />;
    case "tailwind":
      return <Tailwind_SVG width={size} height={size} primaryColor={color} />;
    case "typescript":
      return <Typescript_SVG width={size} height={size} primaryColor={color} />;
    case "nextjs":
      return <Nextjs_SVG width={size} height={size} primaryColor={color} />;
    case "stack":
      return <Stack_SVG width={size} height={size} primaryColor={color} />;
    case "favourite":
      return <Favourite_SVG width={size} height={size} primaryColor={color} />;
    case "success":
      return <Success_SVG width={size} height={size} primaryColor={color} />;
    case "bye":
      return <Bye_SVG width={size} height={size} primaryColor={color} />;
    case "pin":
      return <Pin_SVG width={size} height={size} primaryColor={color} />;
    case "eye":
      return <Eye_SVG width={size} height={size} primaryColor={color} />;
    case "users":
      return <Users_SVG width={size} height={size} primaryColor={color} />;
    case "error":
      return <Error_SVG width={size} height={size} primaryColor={color} />;
    case "globe":
      return <Globe_SVG width={size} height={size} primaryColor={color} />;
    case "admin":
      return <Admin_SVG width={size} height={size} primaryColor={color} />;
    case "search":
      return <Search_SVG width={size} height={size} primaryColor={color} />;
    case "signIn":
      return <SignIn_SVG width={size} height={size} primaryColor={color} />;
    case "cookie":
      return <Cookie_SVG width={size} height={size} primaryColor={color} />;
    case "profile":
      return <Profile_SVG width={size} height={size} primaryColor={color} />;
    case "terminal":
      return <Terminal_SVG width={size} height={size} primaryColor={color} />;
    case "dashboard":
      return <Dashboard_SVG width={size} height={size} primaryColor={color} />;
    default:
      return <></>;
  }
};
