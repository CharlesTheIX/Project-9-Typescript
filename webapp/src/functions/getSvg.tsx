import Users_SVG from "@/SVGs/Users_SVG";
import Globe_SVG from "@/SVGs/Globe_SVG";
import Admin_SVG from "@/SVGs/Admin_SVG";
import Error_SVG from "@/SVGs/Error_SVG";
import Cookie_SVG from "@/SVGs/Cookie_SVG";
import SignIn_SVG from "@/SVGs/SignIn_SVG";
import Profile_SVG from "@/SVGs/Profile_SVG";
import Terminal_SVG from "@/SVGs/Terminal_SVG";
import Dashboard_SVG from "@/SVGs/Dashboard_SVG";

type Props = {
  icon?: string;
  size?: number;
  color?: string;
};

export default (props: Props): React.ReactElement => {
  const { icon, size, color = "inherit" } = props;

  switch (icon) {
    case "users":
      return <Users_SVG width={size} height={size} primaryColor={color} />;
    case "error":
      return <Error_SVG width={size} height={size} primaryColor={color} />;
    case "globe":
      return <Globe_SVG width={size} height={size} primaryColor={color} />;
    case "admin":
      return <Admin_SVG width={size} height={size} primaryColor={color} />;
    case "profile":
      return <Profile_SVG width={size} height={size} primaryColor={color} />;
    case "dashboard":
      return <Dashboard_SVG width={size} height={size} primaryColor={color} />;
    case "signIn":
      return <SignIn_SVG width={size} height={size} primaryColor={color} />;
    case "cookie":
      return <Cookie_SVG width={size} height={size} primaryColor={color} />;
    case "terminal":
      return <Terminal_SVG width={size} height={size} primaryColor={color} />;
    default:
      return <></>;
  }
};
