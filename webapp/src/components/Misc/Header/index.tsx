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
    <header className={`sticky top-0 right-0 w-screen ${theme}`}>
      <div className="py-5 px-10 mt-5 mx-auto">
        <div className="flex flex-row gap-5 items-center justify-between max-w-7xl mx-auto">
          <Link id="header-logo" href="/" className={`flex flex-row gap-1 items-center ${theme}`}>
            <Terminal_SVG width={50} height={50} />
            <p className="text-5xl font-bold">P9</p>
          </Link>

          <nav className="flex flex-row gap-5 items-center">
            <ul className="flex flex-row gap-5 items-center">
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
