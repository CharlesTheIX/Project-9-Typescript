import Link from "next/link";
import { Fragment } from "react";
import Globe_SVG from "../SVGs/Globe_SVG";
import Admin_SVG from "../SVGs/Admin_SVG";
import Cookie_SVG from "../SVGs/Cookie_SVG";
import SignIn_SVG from "../SVGs/SignIn_SVG";
import Profile_SVG from "../SVGs/Profile_SVG";
import Dashboard_SVG from "../SVGs/Dashboard_SVG";
import Terminal_SVG from "@/components/SVGs/Terminal_SVG";
import Error_SVG from "../SVGs/Error_SVG";
import Users_SVG from "../SVGs/Users_SVG";

type Highlight = {
  href?: string;
  content: string;
  callback?: () => void;
  type: "text" | "link" | "function";
};

type Props = {
  title: string;
  icon?: string;
  content?: string;
  iconSize?: number;
  highlights?: Highlight[];
};

const HeroBanner: React.FC<Props> = (props: Props) => {
  const { icon, content, title, iconSize = 75, highlights = [] } = props;

  const getIcon = (icon?: string): React.ReactElement => {
    switch (icon) {
      case "users":
        return <Users_SVG width={iconSize} height={iconSize} />;
      case "error":
        return <Error_SVG width={iconSize} height={iconSize} />;
      case "globe":
        return <Globe_SVG width={iconSize} height={iconSize} />;
      case "admin":
        return <Admin_SVG width={iconSize} height={iconSize} />;
      case "profile":
        return <Profile_SVG width={iconSize} height={iconSize} />;
      case "dashboard":
        return <Dashboard_SVG width={iconSize} height={iconSize} />;
      case "signIn":
        return <SignIn_SVG width={iconSize} height={iconSize} />;
      case "cookie":
        return <Cookie_SVG width={iconSize} height={iconSize} />;
      case "terminal":
        return <Terminal_SVG width={iconSize} height={iconSize} />;
      default:
        return <></>;
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-row gap-2 items-end justify-start">
        {getIcon(icon)}

        <div className="flex flex-col">
          {highlights && (
            <div className="flex flex-row gap-1 items-center">
              {highlights.map((highlight: Highlight, key: number) => {
                switch (highlight.type) {
                  case "text":
                    return (
                      <Fragment key={key}>
                        <p className="font-bold highlight uppercase">{highlight.content}</p>
                        {key + 1 < highlights.length && <p>|</p>}
                      </Fragment>
                    );
                  case "link":
                    return (
                      <Fragment key={key}>
                        <Link className="font-bold highlight uppercase" href={highlight.href || ""}>
                          {highlight.content}
                        </Link>
                        {key + 1 < highlights.length && <p>|</p>}
                      </Fragment>
                    );
                  case "function":
                    return (
                      <Fragment key={key}>
                        <p
                          className="font-bold highlight uppercase cursor-pointer"
                          onClick={() => {
                            highlight.callback && highlight.callback();
                          }}
                        >
                          {highlight.content}
                        </p>
                        {key + 1 < highlights.length && <p>|</p>}
                      </Fragment>
                    );
                }
              })}
            </div>
          )}
          <h1>{title}</h1>
        </div>
      </div>

      {content && <p className="max-w-3xl">{content}</p>}
    </div>
  );
};

export default HeroBanner;
