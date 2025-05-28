"use client";
import Link from "next/link";
import * as NI from "./navigationItems";
import { NavigationItem } from "@/locals";
import { useUserContext } from "@/contexts/userContext";
import Terminal_SVG from "@/components/SVGs/Terminal_SVG";
import { useThemeContext } from "@/contexts/themeContext";

const Header: React.FC = () => {
  const { theme } = useThemeContext();
  const { user, userRole } = useUserContext();

  return (
    <header id="header" className={theme}>
      <div>
        <div>
          <Link id="header-logo" href="/" className={theme}>
            <Terminal_SVG width={50} height={50} />
            <p>P9</p>
          </Link>

          <nav>
            <ul>
              {!user ? (
                <>
                  {NI.signedOutItems.map((item: NavigationItem, key: number) => {
                    return (
                      <li key={key} className="button">
                        <Link href={item.href}>{item.label}</Link>
                      </li>
                    );
                  })}
                </>
              ) : (
                <>
                  {userRole === "admin" ? (
                    <>
                      {NI.adminItems.map((item: NavigationItem, key: number) => {
                        return (
                          <li key={key} className="button">
                            <Link href={item.href}>{item.label}</Link>
                          </li>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {NI.signedInItems.map((item: NavigationItem, key: number) => {
                        return (
                          <li key={key} className="button">
                            <Link href={item.href}>{item.label}</Link>
                          </li>
                        );
                      })}
                    </>
                  )}
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
