"use client";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Terminal_SVG from "@/SVGs/Terminal_SVG";
import { useUserContext } from "@/contexts/userContext";
import { useThemeContext } from "@/contexts/themeContext";
import { signedOutItems, signedInItems, adminItems } from "./data";

const Header: React.FC = () => {
  const pathname = usePathname();
  const { theme } = useThemeContext();
  const { user, isLoaded } = useUser();
  const userContext = useUserContext();

  const getNavigationItems = () => {
    if (pathname === "/") return <></>;

    if (!user) {
      return (
        <>
          {signedOutItems.map((item: NavigationItem, key: number) => {
            return (
              <li key={key} className="fade-in">
                <Link href={item.href} className="link-text">
                  {item.label}
                </Link>
              </li>
            );
          })}
        </>
      );
    }

    if (userContext.userRole === "admin") {
      return (
        <>
          {adminItems.map((item: NavigationItem, key: number) => {
            return (
              <li key={key}>
                <Link href={item.href} className="link-text">
                  {item.label}
                </Link>
              </li>
            );
          })}
        </>
      );
    }

    return (
      <>
        {signedInItems.map((item: NavigationItem, key: number) => {
          return (
            <li key={key}>
              <Link href={item.href} className="link-text">
                {item.label}
              </Link>
            </li>
          );
        })}
      </>
    );
  };

  return (
    <header id="header" className={theme}>
      <div>
        <div>
          <Link href="/">
            <Terminal_SVG width={50} height={50} />
            <p>P9</p>
          </Link>

          {isLoaded && (
            <nav>
              <ul>{getNavigationItems()}</ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
