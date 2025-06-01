"use client";
import Link from "next/link";
import * as NI from "./navigationItems";
import { useUser } from "@clerk/nextjs";
import { NavigationItem } from "@/locals";
import { useUserContext } from "@/contexts/userContext";
import Terminal_SVG from "@/components/SVGs/Terminal_SVG";
import { useThemeContext } from "@/contexts/themeContext";

const Header: React.FC = () => {
  const { theme } = useThemeContext();
  const { user, isLoaded } = useUser();
  const userContext = useUserContext();

  return (
    <header id="header" className={theme}>
      <div>
        <div>
          <Link id="header-logo" href="/" className={theme}>
            <Terminal_SVG width={50} height={50} />
            <p>P9</p>
          </Link>
          {isLoaded && (
            <nav>
              <ul>
                {!user ? (
                  <>
                    {NI.signedOutItems.map((item: NavigationItem, key: number) => {
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
                        {NI.adminItems.map((item: NavigationItem, key: number) => {
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
                        {NI.signedInItems.map((item: NavigationItem, key: number) => {
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
