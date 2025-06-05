"use client";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import Terminal_SVG from "@/SVGs/Terminal_SVG";
import { useUserContext } from "@/contexts/userContext";
import { useThemeContext } from "@/contexts/themeContext";
import { signedOutItems, signedInItems, adminItems } from "./data";

const Header: React.FC = () => {
  const { theme } = useThemeContext();
  const { user, isLoaded } = useUser();
  const userContext = useUserContext();

  return (
    <header id="header" className={`${theme}  relative pt-5 top-0 right-0 w-screen sticky`}>
      <div className="main py-5 px-10 mx-auto my-0">
        <div className="gap-5 max-w-7xl flex my-0 mx-auto flex-row items-center justify-between">
          <Link href="/" className="header-logo gap-1 flex flex-row items-center">
            <Terminal_SVG width={50} height={50} />
            <p className="text-5-xl font-bold">P9</p>
          </Link>

          {isLoaded && (
            <nav className="gap-5 flex flex-row items-center">
              <ul className="gap-5 flex flex-row items-center">
                {!user ? (
                  <>
                    {signedOutItems.map((item: NavigationItem, key: number) => {
                      return (
                        <li key={key}>
                          <Link href={item.href} className="button">
                            {item.label}
                          </Link>
                        </li>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {userContext.userRole === "admin" ? (
                      <>
                        {adminItems.map((item: NavigationItem, key: number) => {
                          return (
                            <li key={key}>
                              <Link href={item.href} className="button">
                                {item.label}
                              </Link>
                            </li>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        {signedInItems.map((item: NavigationItem, key: number) => {
                          return (
                            <li key={key}>
                              <Link href={item.href} className="button">
                                {item.label}
                              </Link>
                            </li>
                          );
                        })}
                      </>
                    )}
                  </>
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
