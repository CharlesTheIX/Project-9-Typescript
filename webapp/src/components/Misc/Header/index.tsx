"use client";
import Link from "next/link";
import * as NI from "./navigationItems";
import { useUserContext } from "@/contexts/userContext";
import { useThemeContext } from "@/contexts/themeContext";
import Terminal_SVG from "@/components/SVGs/Terminal_SVG";
import SignOutButton from "@/components/Buttons/SingOutButton";
import ThemeToggleButton from "@/components/Buttons/ThemeToggleButton";

const Header: React.FC = () => {
  const { theme } = useThemeContext();
  const { user, userRole } = useUserContext();

  return (
    <header className={`px-10 py-5 sticky top-0 theme-${theme}`}>
      <div className="flex flex-row gap-5 items-center justify-between max-w-7xl mx-auto">
        <Link id="header-logo" href="/" className={`flex flex-row gap-1 items-center ${theme}`}>
          <Terminal_SVG width={50} height={50} />
          <p className="text-5xl font-bold">P9</p>
        </Link>

        <nav className="flex flex-row gap-5 items-center">
          <ul className="flex flex-row gap-5 items-center">
            {!user ? (
              <>
                {NI.signedOutItems.map((item: NI.NavigationItem, key: number) => {
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
                    {NI.adminItems.map((item: NI.NavigationItem, key: number) => {
                      return (
                        <li key={key}>
                          <Link href={item.href}>{item.label}</Link>
                        </li>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {NI.signedInItems.map((item: NI.NavigationItem, key: number) => {
                      return (
                        <li key={key}>
                          <Link href={item.href}>{item.label}</Link>
                        </li>
                      );
                    })}
                  </>
                )}

                <li>
                  <SignOutButton />
                </li>
              </>
            )}

            <li>
              <ThemeToggleButton />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
